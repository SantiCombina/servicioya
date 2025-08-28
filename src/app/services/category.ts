import { getPayloadClient } from '@/lib/payload';
import { Category } from '@/payload-types';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'categories',
      sort: 'name',
      limit: 100,
    });

    return result.docs;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
