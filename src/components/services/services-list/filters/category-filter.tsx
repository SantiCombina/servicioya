import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  layout?: 'vertical' | 'grid';
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  layout = 'vertical',
}: CategoryFilterProps) {
  const containerClass = layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2.5';

  return (
    <div className={containerClass}>
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category}`}
            checked={selectedCategory.includes(category)}
            onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
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
  );
}
