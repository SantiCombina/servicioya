import type { CollectionConfig } from 'payload';

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'service',
      label: 'Servicio',
      type: 'relationship',
      relationTo: 'services',
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
      name: 'client',
      label: 'Cliente',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'date',
      label: 'Fecha',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      label: 'Estado',
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
      label: 'Precio final',
      type: 'number',
      required: false,
    },
    {
      name: 'reviewed',
      label: 'Reseñado',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
