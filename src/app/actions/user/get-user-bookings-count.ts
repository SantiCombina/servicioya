'use server';

import { getPayloadClient } from '@/lib/payload';

export async function getUserBookingsCount(userId: string): Promise<number> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'bookings',
      where: {
        or: [{ client: { equals: userId } }, { provider: { equals: userId } }],
      },
      limit: 0, // Solo queremos el count, no los docs
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error obteniendo conteo de bookings del usuario:', error);
    return 0;
  }
}
