'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { getCategories } from '@/app/services/category';
import { getLocations } from '@/app/services/location';
import { uploadImage } from '@/app/services/media';
import { createService } from '@/app/services/service';
import { getCurrentUser } from '@/app/services/user';
import { serviceCreateSchema } from '@/components/profile/[id]/my-services/new/service-create-schema';
import { actionClient } from '@/lib/safe-action-client';

const loadDataSchema = z.object({});

const uploadImageSchema = z.object({
  formData: z.instanceof(FormData),
});

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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al cargar los datos');
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
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al subir la imagen');
  }
});

export const serviceCreate = actionClient.schema(createServiceActionSchema).action(async ({ parsedInput }) => {
  try {
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

    revalidatePath('/services');
    revalidatePath(`/profile/${parsedInput.providerId}/my-services`);

    return {
      success: true,
      message: response.message,
      serviceId: response.serviceId,
      providerId: parsedInput.providerId,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al crear el servicio');
  }
});
