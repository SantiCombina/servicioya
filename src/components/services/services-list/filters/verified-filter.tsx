import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface VerifiedFilterProps {
  showVerifiedOnly: boolean;
  onVerifiedChange: (checked: boolean) => void;
  size?: 'sm' | 'base';
}

export function VerifiedFilter({ showVerifiedOnly, onVerifiedChange, size = 'base' }: VerifiedFilterProps) {
  const labelClass = size === 'sm' ? 'text-sm' : 'text-base font-medium';

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="verified" checked={showVerifiedOnly} onCheckedChange={onVerifiedChange} />
      <Label htmlFor="verified" className={labelClass}>
        Solo verificados
      </Label>
    </div>
  );
}
