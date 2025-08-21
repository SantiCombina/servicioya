import { getPayloadClient } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { Service } from '@/payload-types';

export async function getServiceById(id: string): Promise<Service> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.findByID({
      collection: 'services',
      id,
      depth: 3,
    });

    if (!result) {
      notFound();
    }

    return result as Service;
  } catch (error) {
    console.error('Error obteniendo servicio:', error);
    notFound();
  }
}
