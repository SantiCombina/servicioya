import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
    },
    {
      name: 'icon',
      label: 'Ícono',
      type: 'text',
      required: false,
    },
  ],
};
