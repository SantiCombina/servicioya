'use server';

import { cookies } from 'next/headers';
import { actionClient } from '@/lib/safe-action-client';
import { redirect } from 'next/navigation';
import { logoutUser, getCurrentUser } from '@/app/services/user';
import { z } from 'zod';

const logoutSchema = z.object({});
const getCurrentUserSchema = z.object({});

export const getCurrentUserAction = actionClient.schema(getCurrentUserSchema).action(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;

    const user = await getCurrentUser(token);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    throw new Error('Error al obtener el usuario actual');
  }
});

export const userLogout = actionClient.schema(logoutSchema).action(async () => {
  try {
    const response = await logoutUser();

    if (!response.success) {
      throw new Error(response.message || 'Error al cerrar sesión');
    }

    const cookieStore = await cookies();
    cookieStore.delete('payload-token');
    cookieStore.delete('payload-user');

    cookieStore.set('payload-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error al cerrar sesión');
  }

  redirect('/');
});
