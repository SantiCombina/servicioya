'use server';

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';

interface CreateServiceData {
  title: string;
  description: string;
  categoryId: number;
  locationId: number;
  priceFrom: number;
  availability?: string;
  imageId?: number;
  providerId: number;
  isActive?: boolean;
}

export async function createService(
  data: CreateServiceData,
): Promise<{ success: boolean; message: string; serviceId?: number }> {
  try {
    const payload = await getPayloadClient();

    const service = await payload.create({
      collection: 'services',
      data: {
        title: data.title,
        description: data.description,
        category: data.categoryId,
        location: data.locationId,
        provider: data.providerId,
        priceFrom: data.priceFrom,
        availability: data.availability,
        image: data.imageId,
        isActive: data.isActive ?? true,
        verified: false,
        rating: null,
        completedJobs: 0,
      },
    });

    revalidatePath('/services');
    revalidatePath('/profile');

    return {
      success: true,
      message: 'Servicio creado correctamente',
      serviceId: service.id,
    };
  } catch (error) {
    console.error('Error creating service:', error);
    return { success: false, message: 'Error al crear el servicio' };
  }
}
