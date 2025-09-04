'use client';

import { Star, Plus, MapPin, Clock, MoreVertical, Eye, Edit, Trash2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui';
import { Category, Location, Media, Review } from '@/payload-types';

import { loadMyServicesAction, serviceDelete } from './actions';

export function MyServicesList() {
  const params = useParams();
  const profileId = params.id as string;

  const [serviceFilter, setServiceFilter] = useState<'all' | 'active' | 'inactive'>('all');

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

  const { executeAsync: deleteServiceAction } = useAction(serviceDelete, {
    onSuccess: (result) => {
      if (result.data?.success) {
        // Recargar datos después de eliminar
        loadData({ profileId });
        toast.success(result.data.message);
      }
    },
    onError: (error) => {
      console.error('Error deleting service:', error);
      toast.error('Error al eliminar el servicio');
    },
  });

  useEffect(() => {
    loadData({ profileId });
  }, [profileId]);

  // Obtener datos de la respuesta de la action
  const currentUser = loadResult.data?.user || null;
  const services = loadResult.data?.services || [];

  const getStatusBadge = (isActive: boolean | null | undefined) => {
    if (isActive) {
      return <Badge className="bg-green-100 text-green-600 border-green-200">Activo</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-600 border-gray-200">Inactivo</Badge>;
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

  const handleDeleteService = async (serviceId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      await deleteServiceAction({
        serviceId: serviceId.toString(),
        userId: profileId,
      });
    }
  };

  const getImageUrl = (image: number | Media | null | undefined): string | null => {
    if (!image) return null;
    if (typeof image === 'object' && 'url' in image) {
      return image.url || null;
    }
    return null;
  };

  const getCategoryName = (category: number | Category): string => {
    if (typeof category === 'object' && 'name' in category) {
      return category.name;
    }
    return 'Categoría';
  };

  const getLocationName = (location: number | Location): string => {
    if (typeof location === 'object' && 'name' in location) {
      return location.name;
    }
    return 'Ubicación';
  };

  const getReviewCount = (reviews: (number | Review)[] | null | undefined): number => {
    return reviews ? reviews.length : 0;
  };

  // Filtros
  const activeServices = services.filter((service) => service.isActive === true);
  const inactiveServices = services.filter((service) => service.isActive !== true);

  const filteredServices =
    serviceFilter === 'all' ? services : serviceFilter === 'active' ? activeServices : inactiveServices;

  // Verificar si el usuario actual puede ver/editar estos servicios
  const canEdit = currentUser && (currentUser.id.toString() === profileId || currentUser.role === 'admin');

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card
          className={`border-border cursor-pointer transition-shadow ${serviceFilter === 'active' ? 'ring-2 ring-green-400' : ''}`}
          onClick={() => setServiceFilter('active')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeServices.length}</div>
              <p className="text-sm text-muted-foreground">Servicios Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`border-border cursor-pointer transition-shadow ${serviceFilter === 'inactive' ? 'ring-2 ring-gray-400' : ''}`}
          onClick={() => setServiceFilter('inactive')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{inactiveServices.length}</div>
              <p className="text-sm text-muted-foreground">Inactivos</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`border-border cursor-pointer transition-shadow ${serviceFilter === 'all' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setServiceFilter('all')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{services.length}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Todos los Servicios</h3>
        <div className="text-sm text-muted-foreground">{filteredServices.length} servicios</div>
      </div>

      {filteredServices.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No tienes servicios aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza creando tu primer servicio para ofrecer a la comunidad.
              </p>
              <Link href={`/profile/${profileId}/my-services/new`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear mi primer servicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Imagen del Servicio */}
                  <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                    {getImageUrl(service.image) ? (
                      <img
                        src={getImageUrl(service.image)!}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-muted-foreground">Sin imagen</div>
                    )}
                  </div>

                  {/* Información del Servicio */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-lg font-semibold text-foreground">{service.title}</h4>
                          {getStatusBadge(service.isActive)}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200">
                            {getCategoryName(service.category)}
                          </span>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {getLocationName(service.location)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.availability || 'No especificado'}
                          </div>
                        </div>
                      </div>

                      {/* Menú de Acciones */}
                      {canEdit && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link href={`/services/${service.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalles
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/profile/${profileId}/my-services/${service.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteService(service.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Precio y Rating */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-lg font-semibold text-green-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {service.priceFrom.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex">{renderStars(service.rating)}</div>
                          <span className="text-sm text-muted-foreground">
                            {service.rating || 0} ({getReviewCount(service.reviews)} reseñas)
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Creado el {new Date(service.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
