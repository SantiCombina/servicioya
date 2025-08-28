'use server';

import { actionClient } from '@/lib/safe-action-client';
import { revalidatePath } from 'next/cache';
import { serviceCreateSchema } from '@/lib/schemas/service-create-schema';
import { createService } from '@/app/services/service';
import { getCurrentUser } from '@/app/services/user';
import { getCategories } from '@/app/services/category';
import { getLocations } from '@/app/services/location';
import { uploadImage } from '@/app/services/media';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Schema para cargar datos iniciales
const loadDataSchema = z.object({});

// Schema para subir imagen
const uploadImageSchema = z.object({
  formData: z.instanceof(FormData),
});

// Schema para crear servicio
const createServiceActionSchema = serviceCreateSchema.extend({
  providerId: z.number(),
});

export const loadNewServiceDataAction = actionClient.schema(loadDataSchema).action(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;

    const [user, categories, locations] = await Promise.all([getCurrentUser(token), getCategories(), getLocations()]);

    return {
      user,
      categories,
      locations,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Error al cargar los datos');
  }
});

export const uploadImageActionSafe = actionClient.schema(uploadImageSchema).action(async ({ parsedInput }) => {
  try {
    const result = await uploadImage(parsedInput.formData);

    if (!result.success) {
      throw new Error(result.message || 'Error al subir la imagen');
    }

    return {
      success: true,
      imageId: result.imageId,
      message: result.message,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Error al subir la imagen');
  }
});

export const serviceCreate = actionClient.schema(createServiceActionSchema).action(async ({ parsedInput }) => {
  try {
    // Mapear los datos al formato esperado por createService
    const serviceData = {
      title: parsedInput.title,
      description: parsedInput.description,
      categoryId: parsedInput.categoryId!,
      locationId: parsedInput.locationId!,
      priceFrom: parsedInput.priceFrom!,
      availability: parsedInput.availability,
      imageId: parsedInput.imageId,
      providerId: parsedInput.providerId,
      isActive: parsedInput.isActive,
    };

    const response = await createService(serviceData);

    if (!response.success) {
      throw new Error(response.message || 'Error al crear el servicio');
    }

    // Revalidar las rutas relacionadas
    revalidatePath('/services');
    revalidatePath(`/profile/${parsedInput.providerId}/my-services`);

    return {
      success: true,
      message: response.message,
      serviceId: response.serviceId,
      providerId: parsedInput.providerId,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Error al crear el servicio');
  }
});
