'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { updateUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';
import { userUpdateSchema } from '@/lib/schemas/user-update-schema';

const updateUserActionSchema = userUpdateSchema.extend({
  userId: z.union([z.string(), z.number()]),
});

export const userUpdate = actionClient.schema(updateUserActionSchema).action(async ({ parsedInput }) => {
  try {
    const { userId, ...userData } = parsedInput;
    const response = await updateUser(userId, userData);

    if (!response.success) {
      throw new Error(response.message || 'Error al actualizar el usuario');
    }

    revalidatePath(`/profile/${userId}`);
    revalidatePath(`/profile/${userId}/edit`);

    return {
      success: true,
      message: 'Perfil actualizado con éxito',
      userId: userId,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error al actualizar el usuario');
  }
});
