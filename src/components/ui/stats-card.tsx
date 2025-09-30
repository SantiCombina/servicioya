import { Card, CardContent } from '@/components/ui';

interface StatsCardProps {
  count: number;
  label: string;
  color: 'yellow' | 'blue' | 'green' | 'gray';
  isActive: boolean;
  onClick: () => void;
}

const colorVariants = {
  yellow: {
    active: 'bg-yellow-100 border-yellow-300 ring-2 ring-yellow-200',
    inactive: 'bg-yellow-50 border-yellow-200',
    countText: 'text-yellow-800',
    labelText: 'text-yellow-600',
  },
  blue: {
    active: 'bg-blue-100 border-blue-300 ring-2 ring-blue-200',
    inactive: 'bg-blue-50 border-blue-200',
    countText: 'text-blue-800',
    labelText: 'text-blue-600',
  },
  green: {
    active: 'bg-green-100 border-green-300 ring-2 ring-green-200',
    inactive: 'bg-green-50 border-green-200',
    countText: 'text-green-800',
    labelText: 'text-green-600',
  },
  gray: {
    active: 'bg-gray-100 border-gray-300 ring-2 ring-gray-200',
    inactive: 'bg-gray-50 border-gray-200',
    countText: 'text-gray-800',
    labelText: 'text-gray-600',
  },
};

export function StatsCard({ count, label, color, isActive, onClick }: StatsCardProps) {
  const variant = colorVariants[color];

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isActive ? variant.active : variant.inactive}`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className={`text-3xl font-bold ${variant.countText}`}>{count}</div>
        <div className={`text-sm font-medium ${variant.labelText}`}>{label}</div>
      </CardContent>
    </Card>
  );
}
