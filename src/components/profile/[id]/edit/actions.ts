'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { uploadImage } from '@/app/services/media';
import { updateUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';
import { userUpdateSchema } from '@/lib/schemas/user-update-schema';

const updateUserActionSchema = userUpdateSchema.extend({
  userId: z.union([z.string(), z.number()]),
});

export const userUpdate = actionClient.schema(updateUserActionSchema).action(async ({ parsedInput }) => {
  try {
    const { userId, location, avatar, ...userData } = parsedInput;

    const updateData = {
      ...userData,
      location: location ? Number(location) : undefined,
      avatar: avatar === null ? null : avatar ? Number(avatar) : undefined,
    };

    const response = await updateUser(userId, updateData);

    if (!response.success) {
      throw new Error(response.message || 'Error al actualizar el usuario');
    }

    revalidatePath(`/profile/${userId}`);
    revalidatePath(`/profile/${userId}/edit`);
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Perfil actualizado con éxito',
      userId: userId,
      user: response.user,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al actualizar el usuario');
  }
});

export const uploadAvatar = actionClient
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
