'use server';

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';

export const updateUser = async (
  userId: number | string,
  userData: { name?: string; phone?: string; dni?: number },
) => {
  const payload = await getPayloadClient();

  try {
    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: userData,
    });

    revalidatePath(`/profile/${userId}`);
    revalidatePath(`/profile/${userId}/edit`);

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Error al actualizar el usuario.' };
  }
};
