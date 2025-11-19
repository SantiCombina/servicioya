'use client';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import { Commentreply } from '@/payload-types';

interface CommentReplyItemProps {
  reply: Commentreply;
}

export function CommentReplyItem({ reply }: CommentReplyItemProps) {
  return (
    <div className="mt-3 pl-4 border-l-2 border-muted-foreground/30 space-y-1">
      <p className="text-sm leading-relaxed">{reply.content}</p>
      <span className="text-xs text-muted-foreground block">
        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: es })}
      </span>
    </div>
  );
}
