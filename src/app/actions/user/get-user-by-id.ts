'use server';

import { getPayloadClient } from '@/lib/payload';

export async function getUserById(id: string) {
  try {
    const payload = await getPayloadClient();
    const user = await payload.findByID({
      collection: 'users',
      id,
    });
    return user;
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return null;
  }
}
