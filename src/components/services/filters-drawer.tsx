'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button, Checkbox, Drawer, DrawerContent, DrawerTitle, DrawerTrigger, Label, Slider } from '@/components/ui';

interface Props {
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
}: Props) {
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
          {/* Solo verificados */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="verified" checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
              <Label htmlFor="verified" className="text-base font-medium">
                Solo verificados
              </Label>
            </div>
          </div>

          {/* Categorías */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Categoría</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategory.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicaciones */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Ubicación</h3>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocation.includes(location)}
                    onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rango de precio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rango de precio</h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botones */}
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
