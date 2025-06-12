'use server';

import { getPayloadClient } from '@/lib/payload'

export async function getUsers() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'users',
      limit: 10,
    })

    return docs
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Error al obtener usuarios')
  }
}
