import type { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations',
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
      name: 'province',
      label: 'Provincia',
      type: 'text',
    },
    {
      name: 'country',
      label: 'País',
      type: 'text',
      defaultValue: 'Argentina',
    },
  ],
};
