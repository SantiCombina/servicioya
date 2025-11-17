'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { commentCreateSchema } from '@/app/(frontend)/services/[id]/comment-create-schema';
import { commentDeleteSchema } from '@/app/(frontend)/services/[id]/comment-delete-schema';
import { commentReplyCreateSchema } from '@/app/(frontend)/services/[id]/comment-reply-create-schema';
import { getProviderCompletedJobs, getServiceCompletedJobs } from '@/app/services/booking';
import {
  createComment,
  createCommentReply,
  deleteComment,
  getCommentReply,
  getCommentsByService,
} from '@/app/services/comment';
import { getCurrentUser } from '@/app/services/user';
import { actionClient } from '@/lib/safe-action-client';

export const getProviderCompletedJobsAction = async (providerId: string | number) => {
  try {
    return await getProviderCompletedJobs(providerId);
  } catch (error) {
    console.error('Error getting provider completed jobs:', error);
    return 0;
  }
};

export const getServiceCompletedJobsAction = async (serviceId: string | number) => {
  try {
    return await getServiceCompletedJobs(serviceId);
  } catch (error) {
    console.error('Error getting service completed jobs:', error);
    return 0;
  }
};

export const getCommentsByServiceAction = async (serviceId: string) => {
  try {
    const comments = await getCommentsByService(serviceId);
    return comments.docs;
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
};

export const getCommentReplyAction = async (commentId: string) => {
  try {
    const reply = await getCommentReply(commentId);
    return reply;
  } catch (error) {
    console.error('Error getting comment reply:', error);
    return null;
  }
};

export const createCommentAction = actionClient.schema(commentCreateSchema).action(async ({ parsedInput }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;
    const user = await getCurrentUser(token);

    if (!user) {
      throw new Error('Debes iniciar sesión para comentar');
    }

    const comment = await createComment({
      serviceId: parsedInput.serviceId,
      authorId: user.id.toString(),
      content: parsedInput.content,
    });

    revalidatePath(`/services/${parsedInput.serviceId}`);

    return { success: true, comment };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al crear el comentario');
  }
});

export const createCommentReplyAction = actionClient
  .schema(commentReplyCreateSchema)
  .action(async ({ parsedInput }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('payload-token')?.value || null;
      const user = await getCurrentUser(token);

      if (!user) {
        throw new Error('Debes iniciar sesión para responder');
      }

      const reply = await createCommentReply({
        commentId: parsedInput.commentId,
        authorId: user.id.toString(),
        content: parsedInput.content,
      });

      // Revalidar la ruta del servicio
      // Necesitamos obtener el serviceId del comentario
      revalidatePath('/services/[id]', 'page');

      return { success: true, reply };
    } catch (error) {
      console.error('Error creating comment reply:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al crear la respuesta');
    }
  });

export const deleteCommentAction = actionClient.schema(commentDeleteSchema).action(async ({ parsedInput }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value || null;
    const user = await getCurrentUser(token);

    if (!user) {
      throw new Error('Debes iniciar sesión para eliminar comentarios');
    }

    await deleteComment(parsedInput.commentId, user.id.toString());

    revalidatePath('/services/[id]', 'page');

    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al eliminar el comentario');
  }
});
