'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { uploadImage } from '@/app/services/media';
import { updateService } from '@/app/services/service';
import { actionClient } from '@/lib/safe-action-client';
import { serviceUpdateSchema } from '@/lib/schemas/service-update-schema';

const updateServiceActionSchema = serviceUpdateSchema.extend({
  serviceId: z.number(),
});

export const serviceUpdate = actionClient.schema(updateServiceActionSchema).action(async ({ parsedInput }) => {
  try {
    const { serviceId, categoryId, locationId, imageId, ...serviceData } = parsedInput;

    const updateData = {
      ...serviceData,
      category: categoryId,
      location: locationId,
      image: imageId === null ? null : imageId || undefined,
    };

    const response = await updateService(serviceId, updateData);

    if (!response.success) {
      throw new Error(response.message || 'Error al actualizar el servicio');
    }

    revalidatePath('/profile/[id]/my-services', 'page');
    revalidatePath('/services/[id]', 'page');
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Servicio actualizado con éxito',
      serviceId: serviceId,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al actualizar el servicio');
  }
});

export const uploadServiceImage = actionClient
  .schema(z.object({ formData: z.instanceof(FormData) }))
  .action(async ({ parsedInput }) => {
    try {
      const { formData } = parsedInput;
      const response = await uploadImage(formData);

      if (!response.success) {
        throw new Error(response.message);
      }

      return {
        success: true,
        imageId: response.imageId,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al subir la imagen');
    }
  });
