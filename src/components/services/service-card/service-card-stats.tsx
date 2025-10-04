import { Clock, MapPin, Star } from 'lucide-react';

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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{service.rating ?? '-'}</span>
          <span className="text-gray-500">({reviewsCount})</span>
        </div>
        <span className="text-sm text-gray-500">{service.completedJobs ?? 0} trabajos</span>
      </div>

      <div className="flex items-center text-gray-500">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm">{location.name}</span>
      </div>

      <div className="flex items-center text-gray-500">
        <Clock className="w-4 h-4 mr-1" />
        <span className="text-sm">{service.availability || 'Consultar horarios'}</span>
      </div>
    </div>
  );
}
