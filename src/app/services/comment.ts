import { getPayloadClient } from '@/lib/payload';

export async function getCommentsByService(serviceId: string) {
  const payload = await getPayloadClient();

  const comments = await payload.find({
    collection: 'comments',
    where: {
      service: {
        equals: parseInt(serviceId),
      },
    },
    depth: 2,
    sort: '-createdAt',
  });

  return comments;
}

export async function createComment({
  serviceId,
  authorId,
  content,
}: {
  serviceId: string;
  authorId: string;
  content: string;
}) {
  const payload = await getPayloadClient();

  const comment = await payload.create({
    collection: 'comments',
    data: {
      service: parseInt(serviceId),
      author: parseInt(authorId),
      content,
      hasReply: false,
    },
  });

  return comment;
}

export async function getCommentById(commentId: string) {
  const payload = await getPayloadClient();

  const comment = await payload.findByID({
    collection: 'comments',
    id: commentId,
    depth: 2,
  });

  return comment;
}

export async function createCommentReply({
  commentId,
  authorId,
  content,
}: {
  commentId: string;
  authorId: string;
  content: string;
}) {
  const payload = await getPayloadClient();

  // Verificar que el comentario existe
  const comment = await payload.findByID({
    collection: 'comments',
    id: commentId,
    depth: 1,
  });

  if (!comment) {
    throw new Error('Comentario no encontrado');
  }

  // Verificar que el servicio pertenece al usuario que está respondiendo
  const serviceId = typeof comment.service === 'number' ? comment.service : comment.service.id;
  const service = await payload.findByID({
    collection: 'services',
    id: serviceId,
    depth: 1,
  });

  const serviceProviderId = typeof service.provider === 'number' ? service.provider : service.provider.id;

  if (serviceProviderId !== parseInt(authorId)) {
    throw new Error('Solo el dueño del servicio puede responder comentarios');
  }

  // Verificar que no existe una respuesta previa
  const existingReply = await payload.find({
    collection: 'commentreplies',
    where: {
      comment: {
        equals: commentId,
      },
    },
  });

  if (existingReply.docs.length > 0) {
    throw new Error('Este comentario ya tiene una respuesta');
  }

  // Crear la respuesta
  const reply = await payload.create({
    collection: 'commentreplies',
    data: {
      comment: parseInt(commentId),
      author: parseInt(authorId),
      content,
    },
  });

  // Actualizar el comentario para marcar que tiene respuesta
  await payload.update({
    collection: 'comments',
    id: commentId,
    data: {
      hasReply: true,
    },
  });

  return reply;
}

export async function getCommentReply(commentId: string) {
  const payload = await getPayloadClient();

  const replies = await payload.find({
    collection: 'commentreplies',
    where: {
      comment: {
        equals: commentId,
      },
    },
    depth: 2,
  });

  return replies.docs[0] || null;
}

export async function deleteComment(commentId: string, userId: string) {
  const payload = await getPayloadClient();

  const comment = await payload.findByID({
    collection: 'comments',
    id: commentId,
    depth: 1,
  });

  if (!comment) {
    throw new Error('Comentario no encontrado');
  }

  const authorId = typeof comment.author === 'number' ? comment.author : comment.author.id;

  if (authorId !== parseInt(userId)) {
    throw new Error('No tienes permiso para eliminar este comentario');
  }

  // Eliminar respuestas asociadas
  const replies = await payload.find({
    collection: 'commentreplies',
    where: {
      comment: {
        equals: commentId,
      },
    },
  });

  for (const reply of replies.docs) {
    await payload.delete({
      collection: 'commentreplies',
      id: reply.id,
    });
  }

  // Eliminar el comentario
  await payload.delete({
    collection: 'comments',
    id: commentId,
  });

  return { success: true };
}
