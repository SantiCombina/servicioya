'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createCommentAction } from '@/app/(frontend)/services/[id]/actions';
import { commentCreateSchema, CommentCreateValues } from '@/app/(frontend)/services/[id]/comment-create-schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface CommentFormProps {
  serviceId: string;
}

export function CommentForm({ serviceId }: CommentFormProps) {
  const form = useForm<CommentCreateValues>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      serviceId,
      content: '',
    },
  });

  const { execute, isExecuting } = useAction(createCommentAction, {
    onSuccess: () => {
      toast.success('Pregunta publicada correctamente');
      form.reset({ serviceId, content: '' });
    },
    onError: ({ error }) => {
      console.error('Error en createComment:', error);
      toast.error(error.serverError || 'Error al publicar la pregunta');
    },
  });

  const onSubmit = (data: CommentCreateValues) => {
    console.log('Submitting comment:', data);
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
                <Textarea
                  placeholder="¿Tienes dudas sobre el servicio? Escribe tu pregunta aquí..."
                  className="min-h-[120px] resize-none border-blue-200 focus-visible:ring-blue-500 bg-white dark:bg-slate-950"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting} size="lg" className="gap-2">
            {isExecuting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Publicar pregunta
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
