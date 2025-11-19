'use client';

import { motion } from 'framer-motion';

import { Review, Service } from '@/payload-types';

import { StarRating } from './service-star-rating';

interface ServiceRatingTabProps {
  service: Service;
  reviews: Review[];
}

export function ServiceRatingTab({ service, reviews }: ServiceRatingTabProps) {
  const totalReviews = reviews.length;
  const avgRating = service.rating || 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => {
      const reviewAvg = ((review.scoreService || 0) + (review.scoreTrato || 0) + (review.scoreCosto || 0)) / 3;
      return Math.round(reviewAvg) === star;
    }).length;
    return { star, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });

  const categoryRatings = [
    {
      name: 'Calidad del servicio',
      rating:
        totalReviews > 0 ? reviews.reduce((sum, review) => sum + (review.scoreService || 0), 0) / totalReviews : 0,
    },
    {
      name: 'Trato y atención',
      rating: totalReviews > 0 ? reviews.reduce((sum, review) => sum + (review.scoreTrato || 0), 0) / totalReviews : 0,
    },
    {
      name: 'Relación precio-calidad',
      rating: totalReviews > 0 ? reviews.reduce((sum, review) => sum + (review.scoreCosto || 0), 0) / totalReviews : 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-5xl font-bold mb-2">{avgRating.toFixed(1)}</div>
          <StarRating rating={avgRating} size="lg" />
          <div className="text-sm text-muted-foreground mt-2">{totalReviews} calificaciones</div>
        </motion.div>

        <motion.div
          className="flex-1 space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {ratingCounts.map(({ star, count, percentage }, index) => (
            <motion.div
              key={star}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <span className="text-sm w-8">{star} ★</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: 'easeOut' as const }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h4 className="font-semibold mb-3">Calificación de características</h4>
        <div className="space-y-3">
          {categoryRatings.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{category.name}</span>
                <span className="text-sm font-medium">{category.rating.toFixed(1)}</span>
              </div>
              <StarRating rating={category.rating} size="sm" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
