'use client';

import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { useMyServicesFilters } from '@/lib/hooks/use-my-services-filters';

import { loadMyServicesAction, serviceDeleteAction } from './actions';
import { EmptyServicesState } from './empty-services-state';
import { ServiceListItem } from './service-list-item';
import { ServicesStats } from './services-stats';

export function MyServicesList() {
  const params = useParams();
  const profileId = params.id as string;

  // Actions para operaciones del servidor
  const {
    execute: loadData,
    result: loadResult,
    isExecuting: isLoadingData,
  } = useAction(loadMyServicesAction, {
    onError: (error) => {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    },
  });

  const { executeAsync: deleteService } = useAction(serviceDeleteAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        loadData({ profileId });
        toast.success(result.data.message);
      }
    },
    onError: (error) => {
      console.error('Error deleting service:', error);
      toast.error('Error al eliminar el servicio');
    },
  });

  // Hook para lógica de filtros del cliente
  const services = loadResult.data?.services || [];
  const { serviceFilter, setServiceFilter, activeServices, inactiveServices, filteredServices } = useMyServicesFilters({
    services,
  });

  const currentUser = loadResult.data?.user || null;
  const isOwner = loadResult.data?.isOwner || false;
  const canEdit = currentUser && (currentUser.id.toString() === profileId || currentUser.role === 'admin');

  useEffect(() => {
    loadData({ profileId });
  }, [profileId]);

  const handleDeleteService = async (serviceId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      await deleteService({
        serviceId: serviceId.toString(),
        userId: profileId,
      });
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ServicesStats
        activeCount={activeServices.length}
        inactiveCount={inactiveServices.length}
        totalCount={services.length}
        currentFilter={serviceFilter}
        onFilterChange={setServiceFilter}
      />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Todos los Servicios</h3>
        <div className="text-sm text-muted-foreground">{filteredServices.length} servicios</div>
      </div>

      {filteredServices.length === 0 ? (
        <EmptyServicesState profileId={profileId} />
      ) : (
        <div className="grid gap-6">
          {filteredServices.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              profileId={profileId}
              isOwner={isOwner}
              canEdit={canEdit || false}
              onDelete={handleDeleteService}
            />
          ))}
        </div>
      )}
    </div>
  );
}
