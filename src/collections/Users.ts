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
      name: 'phone',
      label: 'Teléfono',
      type: 'text',
    },
    {
      name: 'dni',
      label: 'DNI',
      type: 'number',
    },
    {
      name: 'location',
      label: 'Ubicación',
      type: 'relationship',
      relationTo: 'locations',
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'text',
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
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
