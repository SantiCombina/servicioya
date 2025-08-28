import { Star } from 'lucide-react';
import { getUserRating } from '@/app/services/user';

interface Props {
  userId: string | number;
}

export async function UserStars({ userId }: Props) {
  const ratingData = await getUserRating(String(userId));

  if (!ratingData) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gray-300" />
          ))}
        </div>
        <span className="text-sm text-gray-500">Sin reseñas</span>
      </div>
    );
  }

  const { avgRating, totalReviews } = ratingData;
  const filledStars = Math.round(avgRating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        {[...Array(filledStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={filledStars + i} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {totalReviews > 0 ? `${avgRating.toFixed(1)} (${totalReviews} reseñas)` : 'Sin reseñas'}
      </span>
    </div>
  );
}
