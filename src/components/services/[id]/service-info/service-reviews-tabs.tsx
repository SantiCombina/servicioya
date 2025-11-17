'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Review, Service, User } from '@/payload-types';

import { ServiceRatingTab } from './service-rating-tab';
import { ServiceReviewsTab } from './service-reviews-tab';

interface ServiceReviewsTabsProps {
  service: Service;
  reviews: Review[];
}

export function ServiceReviewsTabs({ service, reviews }: ServiceReviewsTabsProps) {
  const reviewsWithComments = reviews.filter((review) => review.comment && review.comment.trim().length > 0);
  const provider = service.provider as User;

  return (
    <Card>
      <CardHeader className="pb-3">
        <Tabs defaultValue="rating" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rating">Calificación</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({reviewsWithComments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="rating" className="mt-6">
            <ServiceRatingTab service={service} reviews={reviews} />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ServiceReviewsTab reviews={reviewsWithComments} provider={provider} />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
