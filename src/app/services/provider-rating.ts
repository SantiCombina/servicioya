import { getPayloadClient } from '@/lib/payload';
import { ProviderRating } from '@/payload-types';

interface CreateProviderRatingParams {
  bookingId: number;
  rating: number;
  comment?: string;
  currentUserId: number;
}

interface ClientRatingData {
  avgRating: number;
  totalRatings: number;
}

/**
 * Crea una calificación del proveedor hacia el cliente
 */
export const createProviderRating = async (params: CreateProviderRatingParams): Promise<ProviderRating> => {
  const { bookingId, rating, comment, currentUserId } = params;

  const payload = await getPayloadClient();

  // Obtener la reserva
  const booking = await payload.findByID({
    collection: 'bookings',
    id: bookingId,
  });

  if (!booking) {
    throw new Error('Reserva no encontrada');
  }

  // Verificar que la reserva está completada
  if (booking.status !== 'completed') {
    throw new Error('Solo se pueden calificar reservas completadas');
  }

  // Extraer IDs
  const providerId = typeof booking.provider === 'object' ? booking.provider.id : booking.provider;
  const clientId = typeof booking.client === 'object' ? booking.client.id : booking.client;
  const serviceId = typeof booking.service === 'object' ? booking.service.id : booking.service;

  // Verificar que el usuario actual es el proveedor
  if (currentUserId !== providerId) {
    throw new Error('Solo el proveedor puede calificar al cliente');
  }

  // Verificar que no existe una calificación previa para esta reserva
  const existingRating = await payload.find({
    collection: 'provider-ratings',
    where: {
      booking: { equals: bookingId },
    },
    limit: 1,
  });

  if (existingRating.docs.length > 0) {
    throw new Error('Ya existe una calificación para esta reserva');
  }

  // Crear la calificación
  const newRating = await payload.create({
    collection: 'provider-ratings',
    data: {
      booking: bookingId,
      provider: providerId,
      ratedUser: clientId,
      service: serviceId,
      rating,
      comment: comment || '',
    },
  });

  // Actualizar el flag en la reserva
  await payload.update({
    collection: 'bookings',
    id: bookingId,
    data: {
      providerRated: true,
    },
  });

  return newRating;
};

/**
 * Obtiene la calificación promedio que ha recibido un cliente de todos los proveedores
 */
export const getClientRating = async (clientId: string | number): Promise<ClientRatingData | null> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'provider-ratings',
      where: {
        ratedUser: { equals: clientId },
      },
      limit: 100,
    });

    const ratings = result.docs as ProviderRating[];
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      return {
        avgRating: 0,
        totalRatings: 0,
      };
    }

    const totalScore = ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0);
    const avgRating = totalScore / totalRatings;

    return {
      avgRating: Math.round(avgRating * 10) / 10,
      totalRatings,
    };
  } catch (error) {
    console.error('Error obteniendo rating del cliente:', error);
    return null;
  }
};

/**
 * Verifica si un proveedor ya calificó a un cliente en una reserva específica
 */
export const hasProviderRatedClient = async (bookingId: number): Promise<boolean> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'provider-ratings',
      where: {
        booking: { equals: bookingId },
      },
      limit: 1,
    });

    return result.docs.length > 0;
  } catch (error) {
    console.error('Error verificando calificación del proveedor:', error);
    return false;
  }
};
