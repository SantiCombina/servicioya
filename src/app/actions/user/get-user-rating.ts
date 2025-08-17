'use server';

import { getPayloadClient } from '@/lib/payload';

export async function getUserRating(userId: string) {
  const payload = await getPayloadClient();

  // 1. Obtener todos los servicios del usuario
  const servicesResult = await payload.find({
    collection: 'services',
    where: {
      provider: { equals: userId },
    },
    limit: 100,
  });
  const services = servicesResult.docs;

  // 2. Obtener todas las reseñas de esos servicios
  let allReviews: any[] = [];
  for (const service of services) {
    if (service.reviews && Array.isArray(service.reviews)) {
      allReviews = allReviews.concat(service.reviews);
    }
  }

  // 3. Calcular el promedio y el total
  const totalReviews = allReviews.length;
  const avgRating =
    totalReviews > 0 ? allReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews : 0;

  return {
    avgRating,
    totalReviews,
  };
}
