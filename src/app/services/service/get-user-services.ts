'use server';

import { getPayloadClient } from '@/lib/payload';
import { Service } from '@/payload-types';

export async function getUserServices(userId: string): Promise<Service[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'services',
    where: {
      provider: { equals: parseInt(userId) },
    },
    sort: '-createdAt',
    limit: 100,
    depth: 2,
  });

  return result.docs;
}
