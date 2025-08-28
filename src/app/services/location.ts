import { getPayloadClient } from '@/lib/payload';
import { Location } from '@/payload-types';

export const getLocations = async (): Promise<Location[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'locations',
      sort: 'name',
      limit: 100,
    });

    return result.docs;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};
