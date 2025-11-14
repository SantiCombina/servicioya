'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createCommentReplyAction } from '@/app/(frontend)/services/[id]/actions';
import {
  commentReplyCreateSchema,
  CommentReplyCreateValues,
} from '@/app/(frontend)/services/[id]/comment-reply-create-schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Commentreply } from '@/payload-types';

interface CommentReplyFormProps {
  commentId: string;
  onSuccess: (reply: Commentreply) => void;
  onCancel: () => void;
}

export function CommentReplyForm({ commentId, onSuccess, onCancel }: CommentReplyFormProps) {
  const form = useForm<CommentReplyCreateValues>({
    resolver: zodResolver(commentReplyCreateSchema),
    defaultValues: {
      commentId,
      content: '',
    },
  });

  const { execute, isExecuting } = useAction(createCommentReplyAction, {
    onSuccess: ({ data }) => {
      toast.success('Respuesta publicada correctamente');
      if (data?.reply) {
        onSuccess(data.reply);
      }
      form.reset({ commentId, content: '' });
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Error al publicar la respuesta');
    },
  });

  const onSubmit = (data: CommentReplyCreateValues) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Escribe tu respuesta..." className="min-h-[80px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isExecuting}>
            Cancelar
          </Button>
          <Button type="submit" size="sm" disabled={isExecuting}>
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              'Publicar respuesta'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
