import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Role',
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
}