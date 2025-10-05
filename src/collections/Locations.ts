import type { CollectionConfig } from 'payload';

const Locations: CollectionConfig = {
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

export default Locations;
