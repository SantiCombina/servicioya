import type { CollectionConfig } from 'payload';

const Comments: CollectionConfig = {
  slug: 'comments',
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
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'textarea',
      required: true,
    },
    {
      name: 'hasReply',
      label: 'Tiene respuesta',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
};

export default Comments;
