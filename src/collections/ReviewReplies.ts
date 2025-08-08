import type { CollectionConfig } from 'payload';

export const ReviewReplies: CollectionConfig = {
  slug: 'reviewreplies',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'review',
      type: 'relationship',
      relationTo: 'reviews',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
    },
  ],
};
