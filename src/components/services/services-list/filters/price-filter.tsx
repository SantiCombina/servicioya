import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface PriceFilterProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  showLabels?: boolean;
  variant?: 'compact' | 'detailed';
}

export function PriceFilter({ priceRange, onPriceChange, showLabels = true, variant = 'detailed' }: PriceFilterProps) {
  if (variant === 'compact') {
    return (
      <div className="px-2">
        <Slider value={priceRange} onValueChange={onPriceChange} max={100000} min={0} step={5000} className="w-full" />
        {showLabels && (
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {showLabels && (
        <Label className="text-sm font-medium mb-2 block">
          Precio: ${priceRange[0]} - ${priceRange[1]}
        </Label>
      )}
      <Slider value={priceRange} onValueChange={onPriceChange} max={100000} min={0} step={5000} className="w-full" />
    </>
  );
}
