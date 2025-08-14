import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photos',
      label: 'Fotos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: false,
    },
    {
      name: 'image',
      label: 'Imagen principal',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'location',
      label: 'Ubicación',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'provider',
      label: 'Proveedor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'priceFrom',
      label: 'Precio desde',
      type: 'number',
      required: true,
    },
    {
      name: 'availability',
      label: 'Disponibilidad',
      type: 'text',
      required: false,
    },
    {
      name: 'rating',
      label: 'Calificación',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      admin: {
        step: 0.1,
      },
    },
    {
      name: 'reviews',
      label: 'Reseñas',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
      required: false,
    },
    {
      name: 'completedJobs',
      label: 'Trabajos completados',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        step: 1,
      },
    },
    {
      name: 'verified',
      label: 'Verificado',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isActive',
      label: 'Activo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
