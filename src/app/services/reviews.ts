import { getPayloadClient } from '@/lib/payload';

export const createReview = async (
  bookingId: string,
  authorId: number,
  scoreService: number,
  scoreTrato: number,
  scoreCosto: number,
  comment?: string,
) => {
  const payload = await getPayloadClient();

  try {
    // 1. Obtener la reserva para validaciones
    const booking = await payload.findByID({
      collection: 'bookings',
      id: parseInt(bookingId),
      depth: 1,
    });

    if (!booking) {
      throw new Error('Reserva no encontrada');
    }

    // 2. Validar que la reserva esté completada
    if (booking.status !== 'completed') {
      throw new Error('Solo puedes calificar reservas completadas');
    }

    // 3. Validar que el usuario sea el cliente de la reserva
    const clientId = typeof booking.client === 'number' ? booking.client : booking.client.id;
    if (clientId !== authorId) {
      throw new Error('No tienes permiso para calificar esta reserva');
    }

    // 4. Validar que no haya sido calificada previamente
    if (booking.reviewed) {
      throw new Error('Esta reserva ya ha sido calificada');
    }

    // 5. Obtener datos necesarios para la reseña
    const serviceId = typeof booking.service === 'number' ? booking.service : booking.service.id;
    const providerId = typeof booking.provider === 'number' ? booking.provider : booking.provider.id;

    // 6. Crear la reseña
    const review = await payload.create({
      collection: 'reviews',
      data: {
        booking: parseInt(bookingId),
        author: authorId,
        targetUser: providerId,
        service: serviceId,
        scoreService,
        scoreTrato,
        scoreCosto,
        comment: comment || '',
      },
    });

    // 7. Marcar la reserva como reseñada
    await payload.update({
      collection: 'bookings',
      id: parseInt(bookingId),
      data: {
        reviewed: true,
      },
    });

    // 8. Agregar la review al servicio
    const service = await payload.findByID({
      collection: 'services',
      id: serviceId,
    });

    const existingReviews = Array.isArray(service.reviews)
      ? service.reviews.map((r) => (typeof r === 'number' ? r : r.id))
      : [];

    await payload.update({
      collection: 'services',
      id: serviceId,
      data: {
        reviews: [...existingReviews, review.id],
      },
    });

    // 9. Actualizar el rating del servicio (promedio de todas las reseñas)
    const allServiceReviews = await payload.find({
      collection: 'reviews',
      where: {
        service: {
          equals: serviceId,
        },
      },
    });

    if (allServiceReviews.docs.length > 0) {
      const totalScore = allServiceReviews.docs.reduce((acc, review) => {
        return acc + (review.scoreService + review.scoreTrato + review.scoreCosto) / 3;
      }, 0);
      const averageRating = totalScore / allServiceReviews.docs.length;

      await payload.update({
        collection: 'services',
        id: serviceId,
        data: {
          rating: parseFloat(averageRating.toFixed(2)),
        },
      });
    }

    return {
      success: true,
      review,
    };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear la reseña',
    };
  }
};

export const getReviewsByService = async (serviceId: string) => {
  const payload = await getPayloadClient();

  try {
    const reviews = await payload.find({
      collection: 'reviews',
      where: {
        service: {
          equals: parseInt(serviceId),
        },
      },
      depth: 2,
      sort: '-createdAt',
    });

    return reviews.docs;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
