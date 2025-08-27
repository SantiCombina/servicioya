'use server';

import { getPayloadClient } from '@/lib/payload';
import { Category } from '@/payload-types';

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'categories',
    sort: 'name',
    limit: 100,
  });

  return result.docs;
}
