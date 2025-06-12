'use server'

import { getPayloadClient } from '@/lib/payload'

interface Props {
  id: string;
  data: {
    email: string;
    name: string;
    role: 'admin' | 'user';
    password?: string;
  }
}

export async function updateUser({id, data}: Props) {
  try {
    const payload = await getPayloadClient();

    const updateData: any = {
      email: data.email,
      name: data.name,
      role: data.role,
    };

    if (data.password && data.password.length > 0) {
      updateData.password = data.password;
    }

    const user = await payload.update({
      collection: 'users',
      id,
      data: updateData,
    })

    return user
  }
  catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Error al actualizar usuario')
  }
}