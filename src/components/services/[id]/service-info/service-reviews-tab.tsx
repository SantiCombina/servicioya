'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Review, User } from '@/payload-types';

import { ReviewItem } from './service-review-card';

interface ServiceReviewsTabProps {
  reviews: Review[];
  provider: User;
}

export function ServiceReviewsTab({ reviews, provider }: ServiceReviewsTabProps) {
  const MAX_VISIBLE_REVIEWS = 6;
  const visibleReviews = reviews.slice(0, MAX_VISIBLE_REVIEWS);
  const hasMoreReviews = reviews.length > MAX_VISIBLE_REVIEWS;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No hay reseñas disponibles aún.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleReviews.map((review) => (
        <ReviewItem key={review.id} review={review} provider={provider} />
      ))}

      {hasMoreReviews && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Mostrar todas las reseñas ({reviews.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Todas las reseñas ({reviews.length})</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} provider={provider} />
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
