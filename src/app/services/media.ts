import { getPayloadClient } from '@/lib/payload';

export const uploadImage = async (
  formData: FormData,
): Promise<{ success: boolean; imageId?: number; message: string }> => {
  try {
    const payload = await getPayloadClient();
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, message: 'No se proporcionó ningún archivo' };
    }

    // Verificar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return { success: false, message: 'El archivo debe ser una imagen' };
    }

    // Verificar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, message: 'La imagen no puede ser mayor a 5MB' };
    }

    // Convertir File a Buffer para Payload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: file.name,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    });

    return {
      success: true,
      imageId: media.id,
      message: 'Imagen subida correctamente',
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, message: 'Error al subir la imagen' };
  }
};
