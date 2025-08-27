'use server';

import { actionClient } from '@/lib/safe-action-client';
import { revalidatePath } from 'next/cache';
import { userUpdateSchema } from '@/lib/schemas/user-update-schema';
import { updateUser } from '@/app/services/user';
import { z } from 'zod';

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
  } catch (error: any) {
    throw new Error(error.message || 'Error al actualizar el usuario');
  }
});
