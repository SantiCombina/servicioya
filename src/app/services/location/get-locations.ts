'use server';

import { getPayloadClient } from '@/lib/payload';
import { Location } from '@/payload-types';

export async function getLocations(): Promise<Location[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'locations',
    sort: 'name',
    limit: 100,
  });

  return result.docs;
}
