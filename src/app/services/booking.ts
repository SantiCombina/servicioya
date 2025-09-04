import { getPayload } from 'payload';

import config from '@/payload.config';

interface CreateBookingData {
  serviceId: number;
  providerId: number;
  clientId: number;
  requestedDate: string;
  proposedPrice: number;
  location: string;
  contactPhone: string;
  message?: string;
}

export async function createBooking(data: CreateBookingData) {
  try {
    const payload = await getPayload({ config });

    // Asegurar que la fecha sea válida convirtiéndola a Date y luego a ISO string
    const bookingDate = new Date(data.requestedDate);

    // Verificar que la fecha sea válida
    if (isNaN(bookingDate.getTime())) {
      throw new Error('Fecha inválida proporcionada');
    }

    // Convertir a ISO string para Payload CMS
    const isoDateString = bookingDate.toISOString();

    // Crear el booking
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        service: data.serviceId,
        provider: data.providerId,
        client: data.clientId,
        date: isoDateString,
        status: 'pending',
        finalPrice: data.proposedPrice,
        reviewed: false,
      },
    });

    return {
      success: true,
      message: 'Solicitud de contratación enviada exitosamente',
      bookingId: booking.id,
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear la contratación',
    };
  }
}

export async function getUserBookings(userId: string) {
  try {
    const payload = await getPayload({ config });

    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        or: [
          {
            client: {
              equals: userId,
            },
          },
          {
            provider: {
              equals: userId,
            },
          },
        ],
      },
      depth: 2,
      sort: '-createdAt',
    });

    return bookings.docs;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al obtener las contrataciones');
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'accepted' | 'completed' | 'cancelled',
) {
  try {
    const payload = await getPayload({ config });

    const booking = await payload.update({
      collection: 'bookings',
      id: bookingId,
      data: {
        status,
      },
    });

    return {
      success: true,
      message: 'Estado de la contratación actualizado',
      booking,
    };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el estado de la contratación',
    };
  }
}
