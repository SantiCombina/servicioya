'use client';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageCircle, Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteCommentAction, getCommentReplyAction } from '@/app/(frontend)/services/[id]/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Comment as CommentType, Commentreply, User } from '@/payload-types';

import { CommentReplyForm } from './comment-reply-form';
import { CommentReplyItem } from './comment-reply-item';

interface CommentItemProps {
  comment: CommentType;
  currentUserId: string | null;
  currentUserRole?: string | null;
  serviceProviderId: string;
}

export function CommentItem({ comment, currentUserId, currentUserRole, serviceProviderId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState<Commentreply | null>(null);
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const author = comment.author as User;
  const authorId =
    typeof comment.author === 'number' ? comment.author.toString() : (comment.author as User).id.toString();
  const isAuthor = currentUserId !== null && currentUserId === authorId;
  const isAdmin = currentUserRole === 'admin';
  const isServiceProvider = currentUserId !== null && currentUserId === serviceProviderId;
  const canDelete = isAdmin || isServiceProvider || isAuthor;

  const { execute: executeDelete, isExecuting: isDeleting } = useAction(deleteCommentAction, {
    onSuccess: () => {
      toast.success('Pregunta eliminada correctamente');
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Error al eliminar la pregunta');
    },
  });

  const loadReply = async () => {
    if (comment.hasReply && !reply) {
      setIsLoadingReply(true);
      try {
        const replyData = await getCommentReplyAction(comment.id.toString());
        setReply(replyData);
      } catch (error) {
        console.error('Error loading reply:', error);
      } finally {
        setIsLoadingReply(false);
      }
    }
  };

  const handleDelete = () => {
    executeDelete({ commentId: comment.id.toString() });
    setShowDeleteDialog(false);
  };

  const handleReplySuccess = (newReply: Commentreply) => {
    setReply(newReply);
    setShowReplyForm(false);
  };

  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex gap-3">
        <UserAvatar name={author.name} avatar={author.avatar} className="h-8 w-8" />

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{author.name || 'Usuario'}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })}
                </span>
              </div>
            </div>

            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>

          <p className="text-sm">{comment.content}</p>

          <div className="flex items-center gap-2">
            {comment.hasReply && !reply && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={loadReply} disabled={isLoadingReply}>
                <MessageCircle className="mr-1 h-3 w-3" />
                {isLoadingReply ? 'Cargando...' : 'Ver respuesta'}
              </Button>
            )}

            {!comment.hasReply && isServiceProvider && !showReplyForm && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowReplyForm(true)}>
                <MessageCircle className="mr-1 h-3 w-3" />
                Responder
              </Button>
            )}

            {comment.hasReply && <Badge variant="secondary">Respondida</Badge>}
          </div>

          {showReplyForm && (
            <div className="mt-3">
              <CommentReplyForm
                commentId={comment.id.toString()}
                onSuccess={handleReplySuccess}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {reply && <CommentReplyItem reply={reply} />}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar pregunta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la pregunta{comment.hasReply ? ' y su respuesta' : ''}. Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
