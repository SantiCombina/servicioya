'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button, Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui';

import { CategoryFilter } from './category-filter';
import { LocationFilter } from './location-filter';
import { PriceFilter } from './price-filter';
import { VerifiedFilter } from './verified-filter';

interface FiltersDrawerProps {
  selectedCategory: string[];
  setSelectedCategory: (value: string[]) => void;
  selectedLocation: string[];
  setSelectedLocation: (value: string[]) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  categories: string[];
  locations: string[];
  resultsCount: number;
}

export function FiltersDrawer({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange,
  showVerifiedOnly,
  setShowVerifiedOnly,
  categories,
  locations,
  resultsCount,
}: FiltersDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocation([...selectedLocation, location]);
    } else {
      setSelectedLocation(selectedLocation.filter((l) => l !== location));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedLocation([]);
    setPriceRange([0, 100000]);
    setShowVerifiedOnly(false);
  };

  const hasActiveFilters =
    selectedCategory.length > 0 ||
    selectedLocation.length > 0 ||
    showVerifiedOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 relative font-normal">
          <Filter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerTitle className="sr-only">Filtros de búsqueda</DrawerTitle>
        <div className="px-4 py-6 overflow-y-auto space-y-6">
          <div className="space-y-3">
            <VerifiedFilter showVerifiedOnly={showVerifiedOnly} onVerifiedChange={setShowVerifiedOnly} />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Categoría</h3>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              layout="grid"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Ubicación</h3>
            <LocationFilter
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
              layout="grid"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rango de precio</h3>
            <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} variant="compact" />
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex gap-3">
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearAllFilters} className="flex-1 text-blue-600 hover:text-blue-700">
                Limpiar filtros
              </Button>
            )}
            <Button onClick={() => setOpen(false)} className="flex-1" size="lg">
              Ver resultados ({resultsCount})
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
