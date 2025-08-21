'use server';

import { getPayloadClient } from '@/lib/payload';

export async function getUserServicesCount(userId: string): Promise<number> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'services',
      where: {
        provider: { equals: userId },
        isActive: { equals: true },
      },
      limit: 0, // Solo queremos el count, no los docs
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error obteniendo conteo de servicios del usuario:', error);
    return 0;
  }
}
