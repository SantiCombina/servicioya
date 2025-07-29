import type { CollectionConfig } from 'payload';

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'provider',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Aceptada', value: 'accepted' },
        { label: 'Finalizada', value: 'completed' },
        { label: 'Cancelada', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'finalPrice',
      type: 'number',
      required: false,
    },
    {
      name: 'reviewed',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export default Bookings;
