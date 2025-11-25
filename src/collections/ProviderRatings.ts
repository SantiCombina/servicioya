import type { CollectionConfig } from 'payload';

const ProviderRatings: CollectionConfig = {
  slug: 'provider-ratings',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'booking',
      label: 'Reserva',
      type: 'relationship',
      relationTo: 'bookings',
      required: true,
      unique: true,
    },
    {
      name: 'provider',
      label: 'Proveedor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'ratedUser',
      label: 'Usuario calificado',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'service',
      label: 'Servicio',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'rating',
      label: 'Calificación',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: {
        step: 1,
        description: 'Califica al cliente de 1 a 5 estrellas',
      },
    },
    {
      name: 'comment',
      label: 'Comentario',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Comentario opcional sobre la experiencia con el cliente',
      },
    },
    {
      name: 'createdAt',
      label: 'Fecha de creación',
      type: 'date',
      required: true,
    },
  ],
};

export default ProviderRatings;
