import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'publicUrl',
      type: 'text',
      admin: { readOnly: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData && siblingData._key) {
              return `https://fcpy168ehw.ufs.sh/f/${siblingData._key}`;
            }
            return undefined;
          },
        ],
      },
    },
  ],
  upload: true,
};
