'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { getCurrentUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';

const rateClientSchema = z.object({
  bookingId: z.string().min(1, 'ID de reserva requerido'),
  rating: z.number().min(1).max(5, 'La calificación debe estar entre 1 y 5'),
  comment: z.string().optional(),
});

type RateClientInput = z.infer<typeof rateClientSchema>;

export const rateClient = actionClient
  .schema(rateClientSchema)
  .action(async ({ parsedInput }: { parsedInput: RateClientInput }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('payload-token')?.value;

      if (!token) {
        throw new Error('No autorizado');
      }

      // Obtener el usuario actual desde el token y la reserva
      const currentUser = await getCurrentUser(token);

      // Obtener la reserva para validar que el usuario autenticado es el proveedor
      const bookingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/bookings/${parsedInput.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!bookingResponse.ok) {
        const errBody = await bookingResponse.text();
        throw new Error('Reserva no encontrada: ' + errBody);
      }

      const booking = await bookingResponse.json();

      // Verificar si la reserva está completada
      if (booking.status !== 'completed') {
        throw new Error('Solo se pueden calificar reservas completadas');
      }

      // Determinar IDs de provider, client y service
      const providerId = typeof booking.provider === 'object' ? booking.provider.id : booking.provider;
      const clientId = typeof booking.client === 'object' ? booking.client.id : booking.client;
      const serviceId = typeof booking.service === 'object' ? booking.service.id : booking.service;

      // Verificar que el usuario autenticado es el proveedor
      if (!currentUser || String(currentUser.id) !== String(providerId)) {
        throw new Error('Solo el proveedor puede calificar al cliente');
      }

      // Crear la calificación incluyendo relaciones necesarias
      const bookingIdNumber = parseInt(parsedInput.bookingId, 10);
      const createRatingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/provider-ratings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            booking: bookingIdNumber,
            provider: providerId,
            ratedUser: clientId,
            service: serviceId,
            rating: parsedInput.rating,
            comment: parsedInput.comment || null,
            createdAt: new Date().toISOString(),
          }),
        },
      );

      if (!createRatingResponse.ok) {
        let errorText = 'Error al crear la calificación';
        try {
          const errorJson = await createRatingResponse.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } catch {
          const txt = await createRatingResponse.text();
          errorText = txt || errorText;
        }
        throw new Error(errorText);
      }

      const newRating = await createRatingResponse.json();

      // Actualizar el estado de la reserva
      const patchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/bookings/${parsedInput.bookingId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            providerRated: true,
          }),
        },
      );

      if (!patchResponse.ok) {
        // Non-fatal: log and continue, but surface a warning
        const txt = await patchResponse.text();
        console.warn('Warning: no se pudo marcar providerRated en la reserva:', txt);
      }

      return {
        success: true,
        rating: newRating,
        message: 'Calificación registrada correctamente',
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error desconocido al calificar');
    }
  });
