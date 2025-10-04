import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Review, Service, User } from '@/payload-types';

import { ReviewItem } from './service-review-card';
import { StarRating } from './service-star-rating';

interface ServiceReviewsProps {
  service: Service;
  reviews: Review[];
  completedJobs: number;
}

export function ServiceReviews({ service, reviews, completedJobs }: ServiceReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calificaciones y Reseñas</CardTitle>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{service.rating || 0}</div>
            <div className="text-sm text-gray-500">Calificación</div>
            <StarRating rating={service.rating || 0} size="sm" className="justify-center" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{reviews.length}</div>
            <div className="text-xs text-gray-500">Reseñas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{completedJobs}</div>
            <div className="text-xs text-gray-500">Trabajos</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.length > 0 && typeof service.provider === 'object' ? (
            reviews.map((review) => <ReviewItem key={review.id} review={review} provider={service.provider as User} />)
          ) : (
            <p className="text-center text-muted-foreground py-8">No hay reseñas disponibles aún.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
