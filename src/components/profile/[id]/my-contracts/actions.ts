'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { getUserBookings, updateBookingStatus } from '@/app/services/booking';
import { createProviderRating, getClientRating } from '@/app/services/provider-rating';
import { createReview } from '@/app/services/reviews';
import { getCurrentUser } from '@/app/services/user';
import { reviewCreateSchema } from '@/components/profile/[id]/my-contracts/review-create-schema';
import { actionClient } from '@/lib/safe-action-client';

// Schema para cargar datos de contratos
const loadMyContractsSchema = z.object({
  profileId: z.string().min(1, 'ID de perfil requerido'),
});

// Schema para actualizar estado de contrato
const updateContractStatusSchema = z.object({
  bookingId: z.string().min(1, 'ID de contrato requerido'),
  status: z.enum(['pending', 'accepted', 'completed', 'cancelled'], {
    required_error: 'Estado requerido',
  }),
});

export const loadMyContractsAction = actionClient
  .schema(loadMyContractsSchema)
  .action(async ({ parsedInput: { profileId } }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('payload-token')?.value || null;

      const [user, userBookings] = await Promise.all([getCurrentUser(token), getUserBookings(profileId)]);

      // Cargar calificación promedio de cada cliente en los contratos
      const contractsWithClientRating = await Promise.all(
        userBookings.map(async (booking) => {
          const clientId = typeof booking.client === 'object' ? booking.client.id : booking.client;
          const clientRating = await getClientRating(clientId);
          return {
            ...booking,
            clientRating: clientRating || { avgRating: 0, totalRatings: 0 },
          };
        }),
      );

      return {
        success: true,
        user,
        contracts: contractsWithClientRating,
      };
    } catch (error) {
      console.error('Error loading my contracts data:', error);
      throw new Error('Error al cargar los datos de contratos');
    }
  });

export const updateContractStatusAction = actionClient
  .schema(updateContractStatusSchema)
  .action(async ({ parsedInput }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('payload-token')?.value || null;
      const currentUser = await getCurrentUser(token);

      if (!currentUser) {
        throw new Error('Debes iniciar sesión para realizar esta acción');
      }

      const response = await updateBookingStatus(parsedInput.bookingId, parsedInput.status);

      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el estado del contrato');
      }

      // Revalidar las rutas relacionadas
      revalidatePath(`/profile/${currentUser.id}/my-contracts`);

      return {
        success: true,
        message: response.message,
        booking: response.booking,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al actualizar el estado del contrato');
    }
  });

export const createReviewAction = actionClient.schema(reviewCreateSchema).action(async ({ parsedInput }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      throw new Error('Debes iniciar sesión para calificar');
    }

    const response = await createReview(
      parsedInput.bookingId,
      currentUser.id,
      parsedInput.scoreService,
      parsedInput.scoreTrato,
      parsedInput.scoreCosto,
      parsedInput.comment,
    );

    if (!response.success) {
      throw new Error(response.message || 'Error al crear la reseña');
    }

    // Revalidar las rutas relacionadas
    revalidatePath(`/profile/${currentUser.id}/my-contracts`);

    return {
      success: true,
      message: 'Reseña creada exitosamente',
      review: response.review,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al crear la reseña');
  }
});

// Schema para calificar cliente
const rateClientSchema = z.object({
  bookingId: z.string().min(1, 'ID de reserva requerido'),
  rating: z.number().min(1, 'Calificación mínima: 1').max(5, 'Calificación máxima: 5'),
});

export const rateClientAction = actionClient.schema(rateClientSchema).action(async ({ parsedInput }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  if (!token) {
    throw new Error('Debes iniciar sesión para calificar');
  }

  const user = await getCurrentUser(token);

  if (!user) {
    throw new Error('Debes iniciar sesión para calificar');
  }

  const bookingId = parseInt(parsedInput.bookingId, 10);

  if (isNaN(bookingId)) {
    throw new Error('ID de reserva inválido');
  }

  const rating = await createProviderRating({
    bookingId,
    rating: parsedInput.rating,
    currentUserId: user.id,
  });

  // Revalidar las páginas relevantes
  revalidatePath(`/profile/${user.id}/my-contracts`);

  return {
    success: true,
    rating,
    message: 'Calificación registrada correctamente',
  };
});
