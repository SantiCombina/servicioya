import { getPayloadClient } from '@/lib/payload';
import { ProviderRating } from '@/payload-types';

interface ClientRatingData {
  avgRating: number;
  totalRatings: number;
}

/**
 * Obtiene la calificación promedio que ha recibido un cliente de todos los proveedores.
 * Calcula el promedio de todas las calificaciones en la colección provider-ratings
 * donde ratedUser es el cliente.
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
      avgRating: Math.round(avgRating * 10) / 10, // Redondear a 1 decimal
      totalRatings,
    };
  } catch (error) {
    console.error('Error obteniendo rating del cliente:', error);
    return null;
  }
};
