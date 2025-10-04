import { getPayloadClient } from '@/lib/payload';
import { Service } from '@/payload-types';

export const getServices = async (): Promise<Service[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services',
      where: {
        isActive: { equals: true },
      },
      sort: '-createdAt',
      limit: 100,
      depth: 2,
    });

    const servicesWithCompletedJobs = await Promise.all(
      result.docs.map(async (service) => {
        const completedBookings = await payload.find({
          collection: 'bookings',
          where: {
            service: { equals: service.id },
            status: { equals: 'completed' },
          },
          limit: 1000, // Límite alto para contar todos
        });

        return {
          ...service,
          completedJobs: completedBookings.totalDocs,
        } as Service;
      }),
    );

    return servicesWithCompletedJobs;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  if (!id) {
    console.error('Error: id is undefined, null, or empty in getServiceById');
    return null;
  }
  try {
    const payload = await getPayloadClient();
    const result = await payload.findByID({
      collection: 'services',
      id,
      depth: 2,
    });

    return result as Service;
  } catch (error) {
    console.error('Error fetching service by id:', error);
    return null;
  }
};

export const getUserServices = async (userId: string, isOwner: boolean = false): Promise<Service[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services',
      where: {
        provider: { equals: userId },
        // Si no es el dueño, solo mostrar servicios activos
        ...(isOwner ? {} : { isActive: { equals: true } }),
      },
      sort: '-createdAt',
      depth: 2,
    });

    return result.docs;
  } catch (error) {
    console.error('Error fetching user services:', error);
    return [];
  }
};

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

export const createService = async (data: CreateServiceData) => {
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

    return {
      success: true,
      message: 'Servicio creado correctamente',
      serviceId: service.id,
    };
  } catch (error) {
    console.error('Error creating service:', error);
    return {
      success: false,
      message: 'Error al crear el servicio',
    };
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    const payload = await getPayloadClient();

    await payload.delete({
      collection: 'services',
      id: parseInt(serviceId),
    });

    return {
      success: true,
      message: 'Servicio eliminado correctamente',
    };
  } catch (error) {
    console.error('Error deleting service:', error);
    return {
      success: false,
      message: 'Error al eliminar el servicio',
    };
  }
};

export const updateService = async (serviceId: number, serviceData: any) => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.update({
      collection: 'services',
      id: serviceId,
      data: serviceData,
    });

    return {
      success: true,
      message: 'Servicio actualizado correctamente',
      service: result,
    };
  } catch (error) {
    console.error('Error updating service:', error);
    return {
      success: false,
      message: 'Error al actualizar el servicio',
    };
  }
};
