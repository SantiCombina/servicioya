import type { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'province',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'Argentina',
    },
  ],
};

export default Locations;
