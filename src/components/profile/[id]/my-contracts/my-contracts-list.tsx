'use client';

import { Star, Calendar, MapPin, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button, Card, CardContent, Badge, StatsCard, UserAvatar } from '@/components/ui';
import { Booking, Service, User as UserType, Category, Location, Media } from '@/payload-types';

import { loadMyContractsAction, updateContractStatusAction } from './actions';
import { ContractActionDialog } from './contract-action-dialog';

export function MyContractsList() {
  const params = useParams();
  const profileId = params.id as string;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loadingContractId, setLoadingContractId] = useState<number | null>(null);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: 'accept' | 'reject' | 'complete' | null;
    contractId: number | null;
  }>({ open: false, type: null, contractId: null });

  const {
    execute: loadData,
    result: loadResult,
    isExecuting: isLoadingData,
  } = useAction(loadMyContractsAction, {
    onError: (error) => {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los contratos');
    },
  });

  const { executeAsync: updateContractStatus } = useAction(updateContractStatusAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        loadData({ profileId });
      }
    },
    onError: (error) => {
      console.error('Error updating contract status:', error);
      toast.error('Error al actualizar el estado del contrato');
    },
  });

  useEffect(() => {
    loadData({ profileId });
  }, [profileId]);

  const openDialog = (type: 'accept' | 'reject' | 'complete', contractId: number) => {
    setDialogState({ open: true, type, contractId });
  };

  const closeDialog = () => {
    setDialogState({ open: false, type: null, contractId: null });
  };

  const handleDialogConfirm = async () => {
    if (!dialogState.contractId || !dialogState.type) return;

    const statusMap = {
      accept: 'accepted' as const,
      reject: 'cancelled' as const,
      complete: 'completed' as const,
    };

    setLoadingContractId(dialogState.contractId);

    try {
      await updateContractStatus({
        bookingId: dialogState.contractId.toString(),
        status: statusMap[dialogState.type],
      });
    } finally {
      setLoadingContractId(null);
    }
  };

  const handleRateContract = () => {
    // TODO: Implementar funcionalidad de calificación
    toast.info('Funcionalidad de calificación próximamente');
  };

  // Obtener datos de la respuesta de la action
  const currentUser = loadResult.data?.user || null;
  const contracts = (loadResult.data?.contracts || []) as Booking[];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pendiente
          </Badge>
        );
      case 'accepted':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Confirmado</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'accepted':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStars = (rating: number | null | undefined) => {
    const stars = [];
    const actualRating = rating || 0;
    const fullStars = Math.floor(actualRating);
    const hasHalfStar = actualRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(actualRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    // Crear la fecha desde el string ISO
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString('es-AR'),
      time: date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires', // Especificar zona horaria explícitamente
      }),
    };
  };

  // Helper functions para obtener datos de las relaciones
  const getServiceData = (service: number | Service) => {
    if (typeof service === 'object') {
      return {
        id: service.id,
        title: service.title,
        description: service.description,
        priceFrom: service.priceFrom,
        category: service.category as Category,
        location: service.location as Location,
        availability: service.availability,
        rating: service.rating,
      };
    }
    return null;
  };

  const getUserData = (user: number | UserType) => {
    if (typeof user === 'object') {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar as Media,
      };
    }
    return null;
  };

  // Helper functions para obtener datos de las relaciones

  // Filtros
  const pendingContracts = contracts.filter((contract) => contract.status === 'pending');
  const confirmedContracts = contracts.filter((contract) => contract.status === 'accepted');
  const completedContracts = contracts.filter((contract) => contract.status === 'completed');

  const getFilteredContracts = () => {
    switch (activeFilter) {
      case 'pending':
        return pendingContracts;
      case 'confirmed':
        return confirmedContracts;
      case 'completed':
        return completedContracts;
      case 'all':
      default:
        return contracts;
    }
  };

  const filteredContracts = getFilteredContracts();

  // Verificar si el usuario actual puede ver/editar estos contratos
  const canEdit = currentUser && currentUser.id.toString() === profileId;

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas de Contratos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          count={pendingContracts.length}
          label="Pendientes"
          color="yellow"
          isActive={activeFilter === 'pending'}
          onClick={() => setActiveFilter(activeFilter === 'pending' ? 'all' : 'pending')}
        />
        <StatsCard
          count={confirmedContracts.length}
          label="Confirmados"
          color="blue"
          isActive={activeFilter === 'confirmed'}
          onClick={() => setActiveFilter(activeFilter === 'confirmed' ? 'all' : 'confirmed')}
        />
        <StatsCard
          count={completedContracts.length}
          label="Completados"
          color="green"
          isActive={activeFilter === 'completed'}
          onClick={() => setActiveFilter(activeFilter === 'completed' ? 'all' : 'completed')}
        />
        <StatsCard
          count={contracts.length}
          label="Total"
          color="gray"
          isActive={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        />
      </div>

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
              <Button variant="ghost" size="sm" onClick={() => setActiveFilter('all')} className="text-xs">
                Mostrar todos
              </Button>
            </div>
          )}
        </div>
      </div>

      {filteredContracts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            {activeFilter === 'all' ? (
              <>
                <h3 className="text-xl font-semibold text-foreground mb-2">No tienes contratos aún</h3>
                <p className="text-muted-foreground mb-6">
                  Explora los servicios disponibles y contrata el que necesites.
                </p>
                <Link href="/services">
                  <Button>Explorar Servicios</Button>
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No hay contratos {activeFilter === 'pending' && 'pendientes'}
                  {activeFilter === 'confirmed' && 'confirmados'}
                  {activeFilter === 'completed' && 'completados'}
                </h3>
                <p className="text-muted-foreground mb-6">No tienes contratos en esta categoría actualmente.</p>
                <Button onClick={() => setActiveFilter('all')} variant="outline">
                  Ver todos los contratos
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredContracts.map((contract) => {
            const serviceData = getServiceData(contract.service);
            const providerData = getUserData(contract.provider);
            const clientData = getUserData(contract.client);
            const datetime = formatDateTime(contract.date);

            if (!serviceData || !providerData) return null;

            // Determinar si el usuario actual es el cliente o el proveedor
            const isClient = currentUser && currentUser.id === clientData?.id;
            const otherUser = isClient ? providerData : clientData;

            return (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Información Principal */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(contract.status)}
                            <h4 className="text-lg font-semibold text-foreground">{serviceData.title}</h4>
                            {getStatusBadge(contract.status)}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{serviceData.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                              {serviceData.category?.name || 'Sin categoría'}
                            </span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{serviceData.location?.name || 'Sin ubicación'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{serviceData.availability || 'A consultar'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-semibold">
                                {contract.finalPrice?.toLocaleString('es-AR') ||
                                  serviceData.priceFrom?.toLocaleString('es-AR') ||
                                  'A consultar'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botones en la esquina superior derecha */}
                        <div className="flex flex-col gap-2 ml-4">
                          {/* Botones para contratos completados - Cliente puede calificar */}
                          {canEdit && contract.status === 'completed' && isClient && !contract.reviewed && (
                            <>
                              <Button variant="secondary" size="sm" onClick={handleRateContract}>
                                Calificar
                              </Button>
                              <Button variant="outline" size="sm">
                                Contratar Nuevamente
                              </Button>
                            </>
                          )}

                          {/* Botones para contratos aceptados - Proveedor puede marcar como completado */}
                          {canEdit && contract.status === 'accepted' && !isClient && (
                            <Button
                              onClick={() => openDialog('complete', contract.id)}
                              disabled={loadingContractId === contract.id}
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                            >
                              {loadingContractId === contract.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-2"></div>
                                  Procesando...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Marcar Completado
                                </>
                              )}
                            </Button>
                          )}

                          {/* Botones de Aceptar/Rechazar para contratos pendientes */}
                          {canEdit && contract.status === 'pending' && !isClient && (
                            <>
                              <Button
                                onClick={() => openDialog('accept', contract.id)}
                                disabled={loadingContractId === contract.id}
                                size="sm"
                              >
                                {loadingContractId === contract.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Aceptar Contrato
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => openDialog('reject', contract.id)}
                                disabled={loadingContractId === contract.id}
                                variant="destructive"
                                size="sm"
                              >
                                {loadingContractId === contract.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Rechazar
                                  </>
                                )}
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Información del otro usuario (proveedor si eres cliente, cliente si eres proveedor) */}
                      {otherUser && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <UserAvatar name={otherUser.name} avatar={otherUser.avatar} className="w-10 h-10" />
                            <div>
                              <p className="font-medium text-foreground">
                                {otherUser.name} {isClient ? '(Proveedor)' : '(Cliente)'}
                              </p>
                              {isClient && (
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center space-x-1">{renderStars(serviceData.rating)}</div>
                                  <span className="text-sm text-muted-foreground">({serviceData.rating || 0})</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fecha y Hora Programada */}
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">Fecha Programada</span>
                        </div>
                        <p className="text-foreground">
                          {formatDate(contract.date)} a las {datetime.time}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Contratado el {new Date(contract.createdAt).toLocaleDateString('es-AR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Componente de diálogo reutilizable */}
      <ContractActionDialog
        open={dialogState.open}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        actionType={dialogState.type || 'accept'}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
}
