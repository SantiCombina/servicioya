import { getPayloadClient } from '@/lib/payload';

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
  } catch (error: any) {
    console.error('Error creating user:', error);
    let message = error.message || 'Error al crear usuario';
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
  userData: { name?: string; phone?: string; dni?: number },
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
