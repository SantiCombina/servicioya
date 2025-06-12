'use server'

import { getPayloadClient } from '@/lib/payload'

interface Props {
  data: {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user';
  }
}

export async function createUser({data}: Props) {
  try {
    const payload = await getPayloadClient();

    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      },
    })

    return user
  }
  catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Error al crear usuario')
  }
}