import { Star } from 'lucide-react';
import { getUserRating } from '@/app/actions/user/get-user-rating';

interface Props {
  userId: string | number;
}

export async function UserStars({ userId }: Props) {
  const ratingData = await getUserRating(String(userId));
  const averageRating = ratingData?.avgRating ?? 0;
  const totalReviews = ratingData?.totalReviews ?? 0;

  const filledStars = Math.round(averageRating);
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
        {averageRating.toFixed(1)} ({totalReviews} reseñas)
      </span>
    </div>
  );
}
