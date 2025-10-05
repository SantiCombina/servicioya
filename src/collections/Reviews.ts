import type { CollectionConfig } from 'payload';

const Reviews: CollectionConfig = {
  slug: 'reviews',
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
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'targetUser',
      label: 'Usuario reseñado',
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
      name: 'scoreService',
      label: 'Puntaje servicio',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'scoreTrato',
      label: 'Puntaje trato',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'scoreCosto',
      label: 'Puntaje costo',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'comment',
      label: 'Comentario',
      type: 'textarea',
      required: false,
    },
    {
      name: 'responses',
      label: 'Respuestas',
      type: 'array',
      fields: [
        {
          name: 'author',
          label: 'Autor',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'comment',
          label: 'Comentario',
          type: 'textarea',
        },
        {
          name: 'createdAt',
          label: 'Fecha de creación',
          type: 'date',
        },
      ],
    },
  ],
};

export default Reviews;
