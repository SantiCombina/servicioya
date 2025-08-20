import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: false,
      admin: {
        description: 'Se genera automáticamente basado en el nombre del archivo. Puedes editarlo si lo deseas.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (!value || value.trim() === '') {
              let generatedAlt = '';

              if (siblingData?.filename) {
                const cleanName = siblingData.filename
                  .replace(/\.[^/.]+$/, '')
                  .replace(/[-_]/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .replace(/\b\w/g, (l: string) => l.toUpperCase());

                if (
                  cleanName.toLowerCase().includes('servicio') ||
                  cleanName.toLowerCase().includes('trabajo') ||
                  cleanName.toLowerCase().includes('antes') ||
                  cleanName.toLowerCase().includes('despues')
                ) {
                  generatedAlt = `Imagen del servicio: ${cleanName}`;
                } else {
                  generatedAlt = `Imagen: ${cleanName}`;
                }
              } else {
                generatedAlt = 'Imagen del servicio';
              }

              return generatedAlt;
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'publicUrl',
      label: 'URL pública',
      type: 'text',
      admin: { readOnly: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData && siblingData._key) {
              return `https://fcpy168ehw.ufs.sh/f/${siblingData._key}`;
            }
            return undefined;
          },
        ],
      },
    },
  ],
  upload: {
    staticDir: 'media',
    resizeOptions: {
      width: 1920,
      height: 1920,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'hero',
        width: 1200,
        height: 800,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
          },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  admin: {
    description: 'Imágenes del sistema. Para mejor calidad, usa imágenes de al menos 800x600 píxeles.',
  },
};
