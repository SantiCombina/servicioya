'use client';

import { Star, Calendar, MapPin, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Booking, Service, User as UserType, Category, Location, Media } from '@/payload-types';

interface ContractListItemProps {
  contract: Booking & {
    clientRating?: {
      avgRating: number;
      totalRatings: number;
    };
  };
  currentUser: UserType | null;
  canEdit: boolean;
  loadingContractId: number | null;
  onOpenDialog: (type: 'accept' | 'reject' | 'complete', contractId: number) => void;
  onRateContract: (bookingId: number) => void;
  onRateClient?: (bookingId: number) => void;
}

export function ContractListItem({
  contract,
  currentUser,
  canEdit,
  loadingContractId,
  onOpenDialog,
  onRateContract,
  onRateClient,
}: ContractListItemProps) {
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
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString('es-AR'),
      time: date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires',
      }),
    };
  };

  const serviceData = getServiceData(contract.service);
  const providerData = getUserData(contract.provider);
  const clientData = getUserData(contract.client);
  const datetime = formatDateTime(contract.date);

  if (!serviceData || !providerData) return null;

  // Determinar si el usuario actual es el cliente o el proveedor
  const isClient = currentUser && currentUser.id === clientData?.id;
  const otherUser = isClient ? providerData : clientData;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
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

              <div className="flex flex-col gap-2 ml-4">
                {canEdit && contract.status === 'completed' && isClient && !contract.reviewed && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRateContract(contract.id)}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
                      Calificar servicio
                    </Button>
                    <Button variant="outline" size="sm">
                      Contratar nuevamente
                    </Button>
                  </>
                )}

                {canEdit && contract.status === 'completed' && !isClient && !contract.providerRated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRateClient?.(contract.id)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
                    Calificar cliente
                  </Button>
                )}

                {canEdit && contract.status === 'accepted' && !isClient && (
                  <Button
                    onClick={() => onOpenDialog('complete', contract.id)}
                    disabled={loadingContractId === contract.id}
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {loadingContractId === contract.id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marcar completado
                      </>
                    )}
                  </Button>
                )}

                {canEdit && contract.status === 'pending' && !isClient && (
                  <>
                    <Button
                      onClick={() => onOpenDialog('accept', contract.id)}
                      disabled={loadingContractId === contract.id}
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loadingContractId === contract.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aceptar contrato
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => onOpenDialog('reject', contract.id)}
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
                        <div className="flex items-center">{renderStars(serviceData.rating)}</div>
                        <span className="text-xs text-muted-foreground">({serviceData.rating ? '1' : '0'})</span>
                      </div>
                    )}
                    {!isClient && contract.clientRating && (
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">{renderStars(contract.clientRating.avgRating)}</div>
                        <span className="text-xs text-muted-foreground">({contract.clientRating.totalRatings})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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
}
