import { StarRating } from '@/components/services/[id]/star-rating';
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';
import { formatDate } from '@/lib/helpers/format-date';
import { Review, User, Media } from '@/payload-types';

interface ReviewItemProps {
  review: Review;
  provider: User;
}

export function ReviewItem({ review, provider }: ReviewItemProps) {
  const avgRating = ((review.scoreService || 0) + (review.scoreTrato || 0) + (review.scoreCosto || 0)) / 3;

  // Extraer URL del avatar
  const avatarUrl = provider.avatar && typeof provider.avatar === 'object' ? (provider.avatar as Media).url || '' : '';

  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={avgRating} fillColor="blue" />
          <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
        </div>

        {review.comment && <p className="text-foreground mb-3">{review.comment}</p>}

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
          <div>Servicio: {review.scoreService}/5</div>
          <div>Trato: {review.scoreTrato}/5</div>
          <div>Costo: {review.scoreCosto}/5</div>
        </div>

        {review.responses && review.responses.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg mt-3">
            <div className="flex items-center mb-1">
              <Avatar className="w-6 h-6 mr-2">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{provider.name?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
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
