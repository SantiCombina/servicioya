'use server';

import { getPayloadClient } from '@/lib/payload';
import { cookies } from 'next/headers';

interface LoginProps {
  data: {
    email: string;
    password: string;
  };
}

export async function loginUser({ data }: LoginProps) {
  try {
    const payload = await getPayloadClient();

    // Autentica al usuario usando la Local API de Payload
    const result = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
    });

    // Guardar el token en una cookie httpOnly (igual que el admin de Payload)
    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        // Puedes agregar expires/maxAge según tu configuración
      });
    }

    return { success: true, user: result.user };
  } catch (error: any) {
    let message = error.message || 'Error al iniciar sesión';
    if (message === 'The email or password provided is incorrect.' || message.toLowerCase().includes('incorrect')) {
      message = 'El email o la contraseña son incorrectos.';
    }
    return { success: false, message };
  }
}
