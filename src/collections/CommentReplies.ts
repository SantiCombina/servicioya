import type { CollectionConfig } from 'payload';

const CommentReplies: CollectionConfig = {
  slug: 'commentreplies',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'comment',
      label: 'Comentario',
      type: 'relationship',
      relationTo: 'comments',
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
  ],
  timestamps: true,
};

export default CommentReplies;
