import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req }) => {
      return req.user?.role === 'admin';
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Usuario',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
};
