'use server';

import { getPayloadClient } from '@/lib/payload';
import { TypedUser } from 'payload';

export async function getUserById(id: string): Promise<TypedUser | null> {
  try {
    const payload = await getPayloadClient();
    const user = await payload.findByID({
      collection: 'users',
      id,
    });

    if (user) {
      (user as any).collection = 'users';
    }

    return user as TypedUser | null;
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return null;
  }
}
