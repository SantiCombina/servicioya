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

export async function ServiceComments({
  serviceId,
  comments,
  currentUserId,
  currentUserRole,
  serviceProviderId,
}: ServiceCommentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentUserId && <CommentForm serviceId={serviceId} />}

        {!currentUserId && (
          <div className="text-center py-4 text-muted-foreground">
            <p>Inicia sesión para hacer preguntas sobre este servicio</p>
          </div>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay preguntas aún. ¡Sé el primero en preguntar!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                currentUserRole={currentUserRole}
                serviceProviderId={serviceProviderId}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
