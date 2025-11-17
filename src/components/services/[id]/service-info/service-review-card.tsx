import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { formatDate } from '@/lib/helpers/format-date';
import { Review, User } from '@/payload-types';

import { StarRating } from './service-star-rating';

interface ReviewItemProps {
  review: Review;
  provider: User;
}

export function ReviewItem({ review, provider }: ReviewItemProps) {
  const avgRating = ((review.scoreService || 0) + (review.scoreTrato || 0) + (review.scoreCosto || 0)) / 3;

  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <StarRating rating={avgRating} size="sm" />
          <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
        </div>

        {review.comment && review.comment.trim().length > 0 && (
          <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
        )}

        {review.responses && review.responses.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg mt-3">
            <div className="flex items-center mb-1">
              <UserAvatar name={provider.name} avatar={provider.avatar} className="w-6 h-6 mr-2" />
              <span className="text-sm font-semibold">{provider.name}</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Proveedor
              </Badge>
            </div>
            <p className="text-sm text-foreground">{review.responses[0].comment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
