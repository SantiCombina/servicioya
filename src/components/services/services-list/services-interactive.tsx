'use client';

import { useState, useMemo } from 'react';

import { FiltersDrawer } from '@/components/services/services-list/filters/filters-drawer';
import { FiltersSidebar } from '@/components/services/services-list/filters/filters-sidebar';
import { Service } from '@/payload-types';

import { useFilters } from '../../../lib/hooks/use-filters';
import { useSearchParamsState } from '../../../lib/hooks/use-search-params';

import { EmptyState } from './empty-state';
import { ServicesGrid } from './services-grid';
import { ServicesHeader } from './services-header';

interface ServicesInteractiveProps {
  initialServices: Service[];
}

export function ServicesInteractive({ initialServices }: ServicesInteractiveProps) {
  const [services] = useState<Service[]>(initialServices);

  const {
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    showVerifiedOnly,
    setShowVerifiedOnly,
  } = useSearchParamsState();

  const { processServices, getUniqueOptions } = useFilters({
    searchTerm,
    selectedCategory,
    selectedLocation,
    priceRange,
    showVerifiedOnly,
  });

  const categories = useMemo(() => getUniqueOptions.categories(services), [services, getUniqueOptions]);
  const locations = useMemo(() => getUniqueOptions.locations(services), [services, getUniqueOptions]);

  const processedServices = useMemo(() => {
    return processServices(services, sortBy);
  }, [services, processServices, sortBy]);

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange: (value: number[]) => setPriceRange([value[0], value[1]]),
    showVerifiedOnly,
    setShowVerifiedOnly,
    categories,
    locations,
  };

  return (
    <div className="min-h-main">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block lg:col-span-1">
            <FiltersSidebar {...filterProps} />
          </div>

          <div className="col-span-1 lg:col-span-3">
            <ServicesHeader servicesCount={processedServices.length} sortBy={sortBy} setSortBy={setSortBy}>
              <div className="lg:hidden">
                <FiltersDrawer {...filterProps} resultsCount={processedServices.length} />
              </div>
            </ServicesHeader>

            {processedServices.length > 0 ? <ServicesGrid services={processedServices} /> : <EmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
}
