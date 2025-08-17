'use server';

import { getPayloadClient } from '@/lib/payload';
import { ExtendedService, isServicePopulated } from '@/types/service';

export async function getServices(): Promise<ExtendedService[]> {
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
