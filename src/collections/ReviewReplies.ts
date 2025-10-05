import type { CollectionConfig } from 'payload';

const ReviewReplies: CollectionConfig = {
  slug: 'reviewreplies',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'review',
      label: 'Reseña',
      type: 'relationship',
      relationTo: 'reviews',
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
      name: 'comment',
      label: 'Comentario',
      type: 'textarea',
      required: true,
    },
    {
      name: 'createdAt',
      label: 'Fecha de creación',
      type: 'date',
      required: true,
    },
  ],
};

export default ReviewReplies;
