'use server';

import { getPayloadClient } from '@/lib/payload';
import { Service } from '@/payload-types';

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

  // Retornar todos los servicios, confiando en que las relaciones están pobladas
  return result.docs;
}
