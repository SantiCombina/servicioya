import { MapPin, Star } from 'lucide-react';

import { Service, Location } from '@/payload-types';

function getServiceReviewsCount(service: Service): number {
  if (!service.reviews) return 0;
  return Array.isArray(service.reviews) ? service.reviews.length : 0;
}

interface ServiceCardStatsProps {
  service: Service;
}

export function ServiceCardStats({ service }: ServiceCardStatsProps) {
  const location = service.location as Location;
  const reviewsCount = getServiceReviewsCount(service);

  return (
    <div className="space-y-2 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{service.rating ?? '-'}</span>
          <span className="text-sm text-muted-foreground">({reviewsCount})</span>
        </div>
        <span className="text-xs text-muted-foreground">{service.completedJobs ?? 0} trabajos</span>
      </div>

      <div className="flex items-center text-muted-foreground gap-1">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs">{location.name}</span>
      </div>
    </div>
  );
}
