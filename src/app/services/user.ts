import { getPayloadClient } from '@/lib/payload';
import { User, Review } from '@/payload-types';

export const createUser = async (email: string, password: string, name: string) => {
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'user',
      },
    });

    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    });

    return {
      success: true,
      token: loginResult.token,
      user: loginResult.user,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    let message = error instanceof Error ? error.message : 'Error al crear usuario';
    if (message.toLowerCase().includes('email') && message.toLowerCase().includes('exists')) {
      message = 'El email ya está registrado.';
    }
    return {
      success: false,
      message,
      token: undefined,
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const payload = await getPayloadClient();
    const response = await payload.login({
      collection: 'users',
      data: { email, password },
      depth: 2,
      locale: 'es',
      overrideAccess: false,
      showHiddenFields: true,
    });

    return {
      success: true,
      token: response.token,
    };
  } catch {
    return {
      success: false,
      token: undefined,
    };
  }
};

export const logoutUser = async () => {
  try {
    // En Payload, el logout es principalmente del lado del cliente (eliminar cookies)
    // La lógica de negocio aquí es mínima, pero podríamos agregar logging, etc.
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error during logout:', error);
    return {
      success: false,
      message: 'Error al cerrar sesión',
    };
  }
};

export const updateUser = async (
  userId: number | string,
  userData: {
    name?: string;
    phone?: string;
    dni?: number;
    location?: number;
    address?: string;
    avatar?: number | null;
  },
) => {
  try {
    const payload = await getPayloadClient();

    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: userData,
    });

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: 'Error al actualizar el usuario.',
    };
  }
};

export const getCurrentUser = async (token: string | null) => {
  try {
    if (!token) {
      return null;
    }

    const payload = await getPayloadClient();
    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);

    const { user } = await payload.auth({
      headers,
    });

    return user;
  } catch (error) {
    console.error('Error obteniendo usuario actual:', error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const payload = await getPayloadClient();
    const user = await payload.findByID({
      collection: 'users',
      id,
    });
    return user as User;
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return null;
  }
};

export const getUserServicesCount = async (userId: string): Promise<number> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'services',
      where: {
        provider: { equals: userId },
        isActive: { equals: true },
      },
      limit: 0,
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error obteniendo conteo de servicios del usuario:', error);
    return 0;
  }
};

export const getUserBookingsCount = async (userId: string): Promise<number> => {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'bookings',
      where: {
        or: [{ client: { equals: userId } }, { provider: { equals: userId } }],
      },
      limit: 0,
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error obteniendo conteo de bookings del usuario:', error);
    return 0;
  }
};

interface UserRatingData {
  avgRating: number;
  totalReviews: number;
}

export const getUserRating = async (userId: string): Promise<UserRatingData | null> => {
  try {
    const payload = await getPayloadClient();

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
};
