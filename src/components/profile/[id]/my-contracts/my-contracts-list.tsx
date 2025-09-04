'use client';

import { User, Star, Calendar, MapPin, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button, Card, CardContent, Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';
import { Booking, Service, User as UserType, Category, Location, Media } from '@/payload-types';

import { loadMyContractsAction, updateContractStatusAction } from './actions';

export function MyContractsList() {
  const params = useParams();
  const profileId = params.id as string;

  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  const { executeAsync: updateStatusAction } = useAction(updateContractStatusAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        // Recargar datos después de actualizar
        loadData({ profileId });
        toast.success(result.data.message);
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

  const handleStatusUpdate = async (bookingId: number, status: 'accepted' | 'cancelled' | 'completed') => {
    await updateStatusAction({
      bookingId: bookingId.toString(),
      status,
    });
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

  const getImageUrl = (image: number | Media | null | undefined): string | null => {
    if (!image) return null;
    if (typeof image === 'object' && 'url' in image) {
      return image.url || null;
    }
    return null;
  };

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
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeFilter === 'pending'
              ? 'bg-yellow-100 border-yellow-300 ring-2 ring-yellow-200'
              : 'bg-yellow-50 border-yellow-200'
          }`}
          onClick={() => setActiveFilter(activeFilter === 'pending' ? 'all' : 'pending')}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-800">{pendingContracts.length}</div>
            <div className="text-sm font-medium text-yellow-600">Pendientes</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeFilter === 'confirmed'
              ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200'
              : 'bg-blue-50 border-blue-200'
          }`}
          onClick={() => setActiveFilter(activeFilter === 'confirmed' ? 'all' : 'confirmed')}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-800">{confirmedContracts.length}</div>
            <div className="text-sm font-medium text-blue-600">Confirmados</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeFilter === 'completed'
              ? 'bg-green-100 border-green-300 ring-2 ring-green-200'
              : 'bg-green-50 border-green-200'
          }`}
          onClick={() => setActiveFilter(activeFilter === 'completed' ? 'all' : 'completed')}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-800">{completedContracts.length}</div>
            <div className="text-sm font-medium text-green-600">Completados</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeFilter === 'all' ? 'bg-gray-100 border-gray-300 ring-2 ring-gray-200' : 'bg-gray-50 border-gray-200'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-800">{contracts.length}</div>
            <div className="text-sm font-medium text-gray-600">Total</div>
          </CardContent>
        </Card>
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
            const isProvider = currentUser && currentUser.id === providerData.id;
            const otherUser = isClient ? providerData : clientData;

            return (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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
                                {contract.finalPrice?.toLocaleString('es-AR') || 'Consultar'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botones para contratos completados - Esquina superior derecha */}
                        {canEdit && contract.status === 'completed' && isClient && !contract.reviewed && (
                          <div className="flex flex-col gap-2 ml-4">
                            <Button variant="secondary" size="sm">
                              Calificar
                            </Button>
                            <Button variant="outline" size="sm">
                              Contratar Nuevamente
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Información del otro usuario (proveedor si eres cliente, cliente si eres proveedor) */}
                      {otherUser && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={getImageUrl(otherUser.avatar) || '/placeholder.svg'} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <User className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
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
    </div>
  );
}
