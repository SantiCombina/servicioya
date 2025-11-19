'use client';

import { MessageCircle, Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
      try {
        const replyData = await getCommentReplyAction(comment.id.toString());
        setReply(replyData);
      } catch (error) {
        console.error('Error loading reply:', error);
      }
    }
  };

  useEffect(() => {
    if (comment.hasReply) {
      loadReply();
    }
  }, [comment.hasReply]);

  const handleDelete = () => {
    executeDelete({ commentId: comment.id.toString() });
    setShowDeleteDialog(false);
  };

  const handleReplySuccess = (newReply: Commentreply) => {
    setReply(newReply);
    setShowReplyForm(false);
  };

  return (
    <div className="group hover:bg-muted/30 -mx-2 px-2 py-3 rounded-lg transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-relaxed flex-1">{comment.content}</p>

          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>

        {reply && <CommentReplyItem reply={reply} />}

        {!comment.hasReply && isServiceProvider && !showReplyForm && (
          <div className="-ml-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5 text-primary hover:bg-primary/10"
              onClick={() => setShowReplyForm(true)}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Responder
            </Button>
          </div>
        )}

        {showReplyForm && (
          <div className="mt-3">
            <CommentReplyForm
              commentId={comment.id.toString()}
              onSuccess={handleReplySuccess}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
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
