import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Review, Service, User } from '@/payload-types';

import { ReviewItem } from './service-review-card';
import { StarRating } from './service-star-rating';

interface ServiceReviewsProps {
  service: Service;
  reviews: Review[];
  serviceCompletedJobs: number;
}

export function ServiceReviews({ service, reviews, serviceCompletedJobs }: ServiceReviewsProps) {
  // Filtrar solo las reseñas que tienen comentario
  const reviewsWithComments = reviews.filter((review) => review.comment && review.comment.trim().length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calificación y reseñas de la publicación</CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="text-lg font-semibold">{(service.rating || 0).toFixed(1)}</div>
              <StarRating rating={service.rating || 0} size="md" className="justify-center" />
            </div>
            <div className="text-xs text-gray-500 mt-1">Calificación</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{reviewsWithComments.length}</div>
            <div className="text-xs text-gray-500">Reseñas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{serviceCompletedJobs}</div>
            <div className="text-xs text-gray-500">Trabajos</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviewsWithComments.length > 0 && typeof service.provider === 'object' ? (
            reviewsWithComments.map((review) => (
              <ReviewItem key={review.id} review={review} provider={service.provider as User} />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No hay reseñas disponibles aún.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
