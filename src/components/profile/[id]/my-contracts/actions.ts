'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { getUserBookings, updateBookingStatus } from '@/app/services/booking';
import { getCurrentUser } from '@/app/services/user';
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

      return {
        success: true,
        user,
        contracts: userBookings,
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
