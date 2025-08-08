'use server';

import { getPayloadClient } from '@/lib/payload';
import { cookies } from 'next/headers';

interface Props {
  data: {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user';
  };
}

export async function createUser({ data }: Props) {
  try {
    const payload = await getPayloadClient();

    await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      },
    });

    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
    });

    if (loginResult.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', loginResult.token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
      });
    }

    return { success: true, user: loginResult.user };
  } catch (error: any) {
    console.error('Error creating user:', error);
    let message = error.message || 'Error al crear usuario';
    if (message.toLowerCase().includes('email') && message.toLowerCase().includes('exists')) {
      message = 'El email ya está registrado.';
    }
    return { success: false, error: message };
  }
}
