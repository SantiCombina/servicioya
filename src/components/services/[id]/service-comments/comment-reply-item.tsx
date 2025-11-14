'use client';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Commentreply, User } from '@/payload-types';

interface CommentReplyItemProps {
  reply: Commentreply;
}

export function CommentReplyItem({ reply }: CommentReplyItemProps) {
  const author = reply.author as User;

  return (
    <div className="mt-3 pl-4 border-l-2 border-primary/20">
      <div className="flex gap-3">
        <UserAvatar name={author.name} avatar={author.avatar} className="h-8 w-8" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{author.name || 'Vendedor'}</span>
            <Badge variant="default" className="h-5 text-xs">
              Vendedor
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: es })}
            </span>
          </div>

          <p className="text-sm">{reply.content}</p>
        </div>
      </div>
    </div>
  );
}
