'use client';

import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Comment as CommentType } from '@/payload-types';

import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';

interface ServiceCommentsProps {
  serviceId: string;
  comments: CommentType[];
  currentUserId: string | null;
  currentUserRole?: string | null;
  serviceProviderId: string;
}

export function ServiceComments({
  serviceId,
  comments,
  currentUserId,
  currentUserRole,
  serviceProviderId,
}: ServiceCommentsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Preguntas sobre el servicio</CardTitle>
            {comments.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">({comments.length})</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {currentUserId && (
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
              <CommentForm serviceId={serviceId} />
            </div>
          )}

          {!currentUserId && (
            <div className="text-center py-8 px-4 bg-muted/30 rounded-lg border border-dashed">
              <MessageSquarePlus className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground font-medium">Inicia sesión para hacer preguntas</p>
              <p className="text-sm text-muted-foreground mt-1">Pregúntale al proveedor sobre este servicio</p>
            </div>
          )}

          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageSquarePlus className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-lg font-medium text-muted-foreground mb-2">No hay preguntas aún</p>
                <p className="text-sm text-muted-foreground">¡Sé el primero en preguntar!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    <CommentItem
                      comment={comment}
                      currentUserId={currentUserId}
                      currentUserRole={currentUserRole}
                      serviceProviderId={serviceProviderId}
                    />
                    {index < comments.length - 1 && <div className="border-t mt-6" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
