'use client';

import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CategoryFilter } from './category-filter';
import { LocationFilter } from './location-filter';
import { PriceFilter } from './price-filter';
import { VerifiedFilter } from './verified-filter';

interface FiltersSidebarProps {
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
}

export function FiltersSidebar({
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
}: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (params: Record<string, string | number | boolean | string[]>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          current.set(key, value.join(','));
        } else {
          current.delete(key);
        }
      } else if (typeof value === 'boolean') {
        if (value) {
          current.set(key, '1');
        } else {
          current.delete(key);
        }
      } else if (typeof value === 'number' || typeof value === 'string') {
        current.set(key, String(value));
      }
    });
    router.replace(`?${current.toString()}`);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories;
    if (checked) {
      newCategories = [...selectedCategory, category];
    } else {
      newCategories = selectedCategory.filter((c: string) => c !== category);
    }
    setSelectedCategory(newCategories);
    updateQueryParams({ category: newCategories });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    let newLocations;
    if (checked) {
      newLocations = [...selectedLocation, location];
    } else {
      newLocations = selectedLocation.filter((l: string) => l !== location);
    }
    setSelectedLocation(newLocations);
    updateQueryParams({ location: newLocations });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateQueryParams({ priceFrom: value[0], priceTo: value[1] });
  };

  const handleVerifiedChange = (checked: boolean) => {
    setShowVerifiedOnly(checked);
    updateQueryParams({ verified: checked });
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedLocation([]);
    setPriceRange([0, 100000]);
    setShowVerifiedOnly(false);
    router.replace('?');
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </span>
            <Button variant={'link'} size="sm" className="text-blue-400 pr-0" onClick={handleClearFilters}>
              Remover filtros
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <VerifiedFilter showVerifiedOnly={showVerifiedOnly} onVerifiedChange={handleVerifiedChange} size="sm" />

          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-sm font-medium">Categoría</AccordionTrigger>
              <AccordionContent>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  layout="vertical"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="locations">
            <AccordionItem value="locations">
              <AccordionTrigger className="text-sm font-medium">Ubicación</AccordionTrigger>
              <AccordionContent>
                <LocationFilter
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onLocationChange={handleLocationChange}
                  layout="vertical"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <PriceFilter priceRange={priceRange} onPriceChange={handlePriceChange} variant="detailed" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
