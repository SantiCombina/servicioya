import { Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
  Slider,
  Button,
} from '@/components/ui';

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
}: Props) {
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
    setPriceRange([0, 10000]);
    setShowVerifiedOnly(false);
    router.replace('?');
  };

  return (
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
        {/* Verified Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={showVerifiedOnly}
            onCheckedChange={(checked) => handleVerifiedChange(Boolean(checked))}
          />
          <Label htmlFor="verified" className="text-sm">
            Solo verificados
          </Label>
        </div>

        {/* Categories */}
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm font-medium">Categoría</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1.5">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategory.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Locations */}
        <Accordion type="single" collapsible defaultValue="locations">
          <AccordionItem value="locations">
            <AccordionTrigger className="text-sm font-medium">Ubicación</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1.5">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={location}
                      checked={selectedLocation.includes(location)}
                      onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                    />
                    <Label htmlFor={location} className="text-sm">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Price Range */}
        <>
          <Label className="text-sm font-medium mb-2 block">
            Precio: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={10000}
            min={0}
            step={500}
            className="w-full"
          />
        </>
      </CardContent>
    </Card>
  );
}
