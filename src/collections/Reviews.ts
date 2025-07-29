import type { CollectionConfig } from 'payload';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'booking',
      type: 'relationship',
      relationTo: 'bookings',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'targetUser',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'scoreService',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'scoreTrato',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'scoreCosto',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: false,
    },
    {
      name: 'responses',
      type: 'array',
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'comment',
          type: 'textarea',
        },
        {
          name: 'createdAt',
          type: 'date',
        },
      ],
    },
  ],
};

export default Reviews;
