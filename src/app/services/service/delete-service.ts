'use server';

import { getPayloadClient } from '@/lib/payload';
import { revalidatePath } from 'next/cache';

export async function deleteService(serviceId: string): Promise<{ success: boolean; message: string }> {
  try {
    const payload = await getPayloadClient();

    await payload.delete({
      collection: 'services',
      id: parseInt(serviceId),
    });

    revalidatePath('/services');
    revalidatePath('/profile');

    return { success: true, message: 'Servicio eliminado correctamente' };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, message: 'Error al eliminar el servicio' };
  }
}
