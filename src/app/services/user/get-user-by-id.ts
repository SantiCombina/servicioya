'use server';

import { getPayloadClient } from '@/lib/payload';
import { User } from '@/payload-types';

export async function getUserById(id: string): Promise<User | null> {
  try {
    const payload = await getPayloadClient();
    const user = await payload.findByID({
      collection: 'users',
      id,
    });
    return user as User;
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return null;
  }
}
