import { StatsCard } from '@/components/ui/stats-card';
import { ServiceFilterType } from '@/lib/hooks/use-my-services-filters';

interface ServicesStatsProps {
  activeCount: number;
  inactiveCount: number;
  totalCount: number;
  currentFilter: ServiceFilterType;
  onFilterChange: (filter: ServiceFilterType) => void;
}

export function ServicesStats({
  activeCount,
  inactiveCount,
  totalCount,
  currentFilter,
  onFilterChange,
}: ServicesStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard
        count={activeCount}
        label="Activos"
        color="green"
        isActive={currentFilter === 'active'}
        onClick={() => onFilterChange(currentFilter === 'active' ? 'all' : 'active')}
      />
      <StatsCard
        count={inactiveCount}
        label="Inactivos"
        color="gray"
        isActive={currentFilter === 'inactive'}
        onClick={() => onFilterChange(currentFilter === 'inactive' ? 'all' : 'inactive')}
      />
      <StatsCard
        count={totalCount}
        label="Total"
        color="blue"
        isActive={currentFilter === 'all'}
        onClick={() => onFilterChange('all')}
      />
    </div>
  );
}
