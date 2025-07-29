'use server';

import { cookies } from 'next/headers';

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('payload-token');
    cookieStore.delete('payload-user');

    cookieStore.set('payload-token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
    });
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
