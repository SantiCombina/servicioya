'use server';

import { actionClient } from '@/lib/safe-action-client';
import { revalidatePath } from 'next/cache';
import { deleteService } from '@/app/services/service';
import { getCurrentUser } from '@/app/services/user';
import { getUserServices } from '@/app/services/service';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Schema para cargar datos de mis servicios
const loadMyServicesSchema = z.object({
  profileId: z.string().min(1, 'ID de perfil requerido'),
});

// Schema para eliminar servicio
const serviceDeleteSchema = z.object({
  serviceId: z
    .string({
      required_error: 'El ID del servicio es requerido.',
      invalid_type_error: 'El ID del servicio debe ser una cadena de texto.',
    })
    .min(1, {
      message: 'El ID del servicio es requerido.',
    }),
});

const deleteServiceActionSchema = serviceDeleteSchema.extend({
  userId: z.union([z.string(), z.number()]).optional(),
});

export const loadMyServicesAction = actionClient
  .schema(loadMyServicesSchema)
  .action(async ({ parsedInput: { profileId } }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('payload-token')?.value || null;

      const [user, userServices] = await Promise.all([getCurrentUser(token), getUserServices(profileId)]);

      return {
        success: true,
        user,
        services: userServices,
      };
    } catch (error) {
      console.error('Error loading my services data:', error);
      throw new Error('Error al cargar los datos');
    }
  });

export const serviceDelete = actionClient.schema(deleteServiceActionSchema).action(async ({ parsedInput }) => {
  try {
    const response = await deleteService(parsedInput.serviceId);

    if (!response.success) {
      throw new Error(response.message || 'Error al eliminar el servicio');
    }

    // Revalidar las rutas relacionadas
    revalidatePath('/services');
    if (parsedInput.userId) {
      revalidatePath(`/profile/${parsedInput.userId}/my-services`);
    }

    return {
      success: true,
      message: response.message,
      serviceId: parsedInput.serviceId,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Error al eliminar el servicio');
  }
});
