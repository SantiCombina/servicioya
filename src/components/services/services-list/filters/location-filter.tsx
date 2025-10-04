import { Checkbox, Label } from '@/components/ui';

interface LocationFilterProps {
  locations: string[];
  selectedLocation: string[];
  onLocationChange: (location: string, checked: boolean) => void;
  layout?: 'vertical' | 'grid';
}

export function LocationFilter({
  locations,
  selectedLocation,
  onLocationChange,
  layout = 'vertical',
}: LocationFilterProps) {
  const containerClass = layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2.5';

  return (
    <div className={containerClass}>
      {locations.map((location) => (
        <div key={location} className="flex items-center space-x-2">
          <Checkbox
            id={`location-${location}`}
            checked={selectedLocation.includes(location)}
            onCheckedChange={(checked) => onLocationChange(location, checked as boolean)}
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
  );
}
