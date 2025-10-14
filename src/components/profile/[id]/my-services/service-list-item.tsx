import { Star, MapPin, Clock, MoreVertical, Eye, Edit, Trash2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCategoryName, getImageUrl, getLocationName, getReviewCount } from '@/lib/hooks/use-my-services-filters';
import type { Service } from '@/payload-types';

import { DeleteServiceDialog } from './delete-service-dialog';

interface ServiceListItemProps {
  service: Service;
  profileId: string;
  isOwner: boolean;
  canEdit: boolean;
  onDelete: (serviceId: number) => void;
  isDeletingService?: boolean;
}

export function ServiceListItem({
  service,
  profileId,
  isOwner,
  canEdit,
  onDelete,
  isDeletingService = false,
}: ServiceListItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isInactive = !service.isActive;
  const showAsDisabled = isOwner && isInactive;

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

  return (
    <Card
      key={service.id}
      className={`hover:shadow-lg transition-shadow border-border ${showAsDisabled ? 'opacity-60 bg-gray-50' : ''}`}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-stretch space-y-4 md:space-y-0 md:space-x-6">
          {/* Imagen del Servicio */}
          <div className="w-full md:w-48 h-48 md:h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            {getImageUrl(service.image) ? (
              <img
                src={getImageUrl(service.image)!}
                alt={service.title}
                className={`w-full h-full object-cover object-center ${showAsDisabled ? 'grayscale' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin imagen</div>
            )}
          </div>

          {/* Información del Servicio */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Información Principal */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
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
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/services/${service.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/profile/${profileId}/my-services/${service.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="text-destructive cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {/* Precio, Rating y Fecha */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
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

      <DeleteServiceDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => onDelete(service.id)}
        isLoading={isDeletingService}
        serviceName={service.title}
      />
    </Card>
  );
}
