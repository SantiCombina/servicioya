'use server';

import { getPayloadClient } from '@/lib/payload';

export async function getServices() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'services',
    where: {
      isActive: { equals: true },
    },
    sort: '-createdAt',
    limit: 100,
  });
  return result.docs;
}
