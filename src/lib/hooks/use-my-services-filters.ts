import { useState, useMemo } from 'react';

import { Category, Location, Media, Review } from '@/payload-types';

export type ServiceFilterType = 'all' | 'active' | 'inactive';

interface UseMyServicesFiltersProps {
  services: any[];
}

export function useMyServicesFilters({ services }: UseMyServicesFiltersProps) {
  const [serviceFilter, setServiceFilter] = useState<ServiceFilterType>('all');

  const activeServices = useMemo(() => services.filter((service) => service.isActive === true), [services]);
  const inactiveServices = useMemo(() => services.filter((service) => service.isActive !== true), [services]);

  const filteredServices = useMemo(() => {
    switch (serviceFilter) {
      case 'active':
        return activeServices;
      case 'inactive':
        return inactiveServices;
      default:
        return services;
    }
  }, [services, activeServices, inactiveServices, serviceFilter]);

  return {
    serviceFilter,
    setServiceFilter,
    activeServices,
    inactiveServices,
    filteredServices,
  };
}

// Helper functions para transformaciones de datos
export function getImageUrl(image: number | Media | null | undefined): string | null {
  if (!image) return null;
  if (typeof image === 'object' && 'url' in image) {
    return image.url || null;
  }
  return null;
}

export function getCategoryName(category: number | Category): string {
  if (typeof category === 'object' && 'name' in category) {
    return category.name;
  }
  return 'Categoría';
}

export function getLocationName(location: number | Location): string {
  if (typeof location === 'object' && 'name' in location) {
    return location.name;
  }
  return 'Ubicación';
}

export function getReviewCount(reviews: (number | Review)[] | null | undefined): number {
  return reviews ? reviews.length : 0;
}
