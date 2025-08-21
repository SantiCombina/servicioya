'use server';

import { getPayloadClient } from '@/lib/payload';
import { Service } from '@/payload-types';

// Helper function to check if service relationships are populated
const isServicePopulated = (service: Service): boolean => {
  return (
    typeof service.category === 'object' && typeof service.location === 'object' && typeof service.provider === 'object'
  );
};

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'services',
    where: {
      isActive: { equals: true },
    },
    sort: '-createdAt',
    limit: 100,
    depth: 2, // Esto poblará las relaciones automáticamente
  });

  // Filtrar solo los servicios que tienen las relaciones pobladas
  return result.docs.filter(isServicePopulated);
}
