import { useCallback, useMemo } from 'react';

import { normalize } from '@/lib/helpers/normalize';
import { Category, Location, Service, User } from '@/payload-types';

import { SortOption } from './use-search-params';

interface UseFiltersProps {
  searchTerm: string;
  selectedCategory: string[];
  selectedLocation: string[];
  priceRange: [number, number];
  showVerifiedOnly: boolean;
}

export function useFilters({
  searchTerm,
  selectedCategory,
  selectedLocation,
  priceRange,
  showVerifiedOnly,
}: UseFiltersProps) {
  const filterServices = useCallback(
    (services: Service[]): Service[] => {
      return services.filter((service) => {
        const provider = service.provider as User;
        const category = service.category as Category;
        const location = service.location as Location;

        let matchesSearch = true;
        if (searchTerm.trim() !== '') {
          const term = normalize(searchTerm);
          const keywords = term.split(/\s+/).filter(Boolean);
          const searchableFields = [
            normalize(service.title || ''),
            normalize(provider.name || ''),
            normalize(category.name || ''),
            normalize(service.description || ''),
          ];

          matchesSearch = keywords.some((keyword) => searchableFields.some((field) => field.includes(keyword)));
        }

        const matchesCategory =
          selectedCategory.length === 0 || selectedCategory.some((cat) => normalize(category.name) === normalize(cat));

        const matchesLocation =
          selectedLocation.length === 0 || selectedLocation.some((loc) => normalize(location.name) === normalize(loc));

        const matchesPrice = service.priceFrom >= priceRange[0] && service.priceFrom <= priceRange[1];

        const matchesVerified = !showVerifiedOnly || Boolean(service.verified);

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesVerified;
      });
    },
    [searchTerm, selectedCategory, selectedLocation, priceRange, showVerifiedOnly],
  );

  const sortServices = useCallback((services: Service[], sortBy: SortOption): Service[] => {
    return [...services].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return a.priceFrom - b.priceFrom;
        case 'price-high':
          return b.priceFrom - a.priceFrom;
        case 'jobs':
          return (b.completedJobs || 0) - (a.completedJobs || 0);
        default:
          return 0;
      }
    });
  }, []);

  const processServices = useCallback(
    (services: Service[], sortBy: SortOption): Service[] => {
      const filtered = filterServices(services);
      return sortServices(filtered, sortBy);
    },
    [filterServices, sortServices],
  );

  const getUniqueOptions = useMemo(() => {
    return {
      categories: (services: Service[]) => Array.from(new Set(services.map((s) => (s.category as Category).name))),
      locations: (services: Service[]) => Array.from(new Set(services.map((s) => (s.location as Location).name))),
    };
  }, []);

  return {
    filterServices,
    sortServices,
    processServices,
    getUniqueOptions,
  };
}
