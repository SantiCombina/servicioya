'use client';

import { Badge, Button, StatsCard } from '@/components/ui';
import { Booking } from '@/payload-types';

interface ContractsStatsProps {
  contracts: Booking[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ContractsStats({ contracts, activeFilter, onFilterChange }: ContractsStatsProps) {
  const pendingContracts = contracts.filter((contract) => contract.status === 'pending');
  const confirmedContracts = contracts.filter((contract) => contract.status === 'accepted');
  const completedContracts = contracts.filter((contract) => contract.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Estadísticas de Contratos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          count={pendingContracts.length}
          label="Pendientes"
          color="yellow"
          isActive={activeFilter === 'pending'}
          onClick={() => onFilterChange(activeFilter === 'pending' ? 'all' : 'pending')}
        />
        <StatsCard
          count={confirmedContracts.length}
          label="Confirmados"
          color="blue"
          isActive={activeFilter === 'confirmed'}
          onClick={() => onFilterChange(activeFilter === 'confirmed' ? 'all' : 'confirmed')}
        />
        <StatsCard
          count={completedContracts.length}
          label="Completados"
          color="green"
          isActive={activeFilter === 'completed'}
          onClick={() => onFilterChange(activeFilter === 'completed' ? 'all' : 'completed')}
        />
        <StatsCard
          count={contracts.length}
          label="Total"
          color="gray"
          isActive={activeFilter === 'all'}
          onClick={() => onFilterChange('all')}
        />
      </div>

      {/* Header con filtro activo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-foreground">Todos los Contratos</h3>
          {activeFilter !== 'all' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Mostrando:</span>
              <Badge variant="outline" className="capitalize">
                {activeFilter === 'pending' && 'Pendientes'}
                {activeFilter === 'confirmed' && 'Confirmados'}
                {activeFilter === 'completed' && 'Completados'}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => onFilterChange('all')} className="text-xs">
                Mostrar todos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
