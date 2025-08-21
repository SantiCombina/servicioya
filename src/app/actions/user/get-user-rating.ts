'use server';

import { getPayloadClient } from '@/lib/payload';
import { Review } from '@/payload-types';

interface UserRatingData {
  avgRating: number;
  totalReviews: number;
}

export async function getUserRating(userId: string): Promise<UserRatingData | null> {
  try {
    const payload = await getPayloadClient();

    // Buscar todas las reseñas donde el usuario es el targetUser
    const reviewsResult = await payload.find({
      collection: 'reviews',
      where: {
        targetUser: { equals: userId },
      },
      limit: 100,
    });

    const reviews = reviewsResult.docs as Review[];
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        avgRating: 0,
        totalReviews: 0,
      };
    }

    // Calcular el promedio de los tres puntajes por reseña
    const totalScore = reviews.reduce((sum, review) => {
      const reviewAvg = ((review.scoreService || 0) + (review.scoreTrato || 0) + (review.scoreCosto || 0)) / 3;
      return sum + reviewAvg;
    }, 0);

    const avgRating = totalScore / totalReviews;

    return {
      avgRating,
      totalReviews,
    };
  } catch (error) {
    console.error('Error obteniendo rating del usuario:', error);
    return null;
  }
}
