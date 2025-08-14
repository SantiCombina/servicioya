import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
  Slider,
} from '@/components/ui';
import { Filter } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
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
  searchTerm,
  setSearchTerm,
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

  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Buscar</Label>
          <Input placeholder="Buscar servicios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Categories */}
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm font-medium">Categorías</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
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
              <div className="space-y-2">
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
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Precio (desde): ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={10000} min={0} step={500} className="w-full" />
        </div>

        {/* Verified Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={showVerifiedOnly}
            onCheckedChange={(checked) => setShowVerifiedOnly(Boolean(checked))}
          />
          <Label htmlFor="verified" className="text-sm">
            Solo verificados
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
