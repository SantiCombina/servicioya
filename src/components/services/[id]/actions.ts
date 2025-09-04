'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createBooking } from '@/app/services/booking';
import { getCurrentUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';
import { bookingCreateSchema } from '@/lib/schemas/booking-create-schema';

export const bookingCreate = actionClient.schema(bookingCreateSchema).action(async ({ parsedInput }) => {
  try {
    // Verificar que el usuario esté autenticado
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      throw new Error('Debes iniciar sesión para contratar un servicio');
    }

    // Verificar que el clientId coincida con el usuario actual
    if (currentUser.id !== parsedInput.clientId) {
      throw new Error('No tienes autorización para realizar esta acción');
    }

    // Verificar que el cliente no sea el mismo que el proveedor
    if (parsedInput.clientId === parsedInput.providerId) {
      throw new Error('No puedes contratar tu propio servicio');
    }

    const response = await createBooking({
      serviceId: parsedInput.serviceId,
      providerId: parsedInput.providerId,
      clientId: parsedInput.clientId,
      requestedDate: parsedInput.requestedDate,
      proposedPrice: parsedInput.proposedPrice,
      location: parsedInput.location,
      contactPhone: parsedInput.contactPhone,
      message: parsedInput.message,
    });

    if (!response.success) {
      throw new Error(response.message || 'Error al crear la contratación');
    }

    // Revalidar las rutas relacionadas
    revalidatePath(`/services/${parsedInput.serviceId}`);
    revalidatePath(`/profile/${parsedInput.clientId}/bookings`);
    revalidatePath(`/profile/${parsedInput.providerId}/bookings`);

    return {
      success: true,
      message: response.message,
      bookingId: response.bookingId,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al crear la contratación');
  }
});
