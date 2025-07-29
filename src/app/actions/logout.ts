'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Limpiar todas las cookies relacionadas con la autenticación
    cookieStore.delete('payload-token');
    cookieStore.delete('payload-user');

    // También intentar limpiar con diferentes configuraciones de path
    cookieStore.set('payload-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
    });
  } catch (error) {
    console.error('Error during logout:', error);
  }

  // Redirigir al login
  redirect('/login');
}
