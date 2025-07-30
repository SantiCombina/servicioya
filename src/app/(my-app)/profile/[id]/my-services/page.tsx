'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowLeft, Plus, Edit, Trash2, MapPin, Clock, DollarSign, Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  duration: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'paused' | 'draft';
  image?: string;
  createdAt: string;
}

export default function MyServicesPage() {
  const params = useParams();
  const profileId = params.id;

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Reparación de Computadoras',
      description: 'Servicio de reparación y mantenimiento de computadoras de escritorio y laptops.',
      category: 'Tecnología',
      price: 2500,
      location: 'Buenos Aires',
      duration: '2-3 horas',
      rating: 4.8,
      reviewCount: 12,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Clases de Programación',
      description: 'Clases particulares de programación en JavaScript, Python y React.',
      category: 'Educación',
      price: 1800,
      location: 'Buenos Aires',
      duration: '1 hora',
      rating: 4.9,
      reviewCount: 8,
      status: 'active',
      createdAt: '2024-02-01',
    },
    {
      id: '3',
      title: 'Instalación de Software',
      description: 'Instalación y configuración de software especializado.',
      category: 'Tecnología',
      price: 800,
      location: 'Buenos Aires',
      duration: '1 hora',
      rating: 4.6,
      reviewCount: 5,
      status: 'draft',
      createdAt: '2024-02-10',
    },
  ]);

  useEffect(() => {
    // Cargar servicios del usuario (simulado)
    const savedServices = localStorage.getItem(`userServices_${profileId}`);
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, [profileId]);

  const getStatusBadge = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-600 border-green-200">Activo</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-600 border-yellow-200">Pausado</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-600 border-gray-200">Borrador</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      const updatedServices = services.filter((service) => service.id !== serviceId);
      setServices(updatedServices);
      localStorage.setItem(`userServices_${profileId}`, JSON.stringify(updatedServices));
    }
  };

  const [serviceFilter, setServiceFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');
  const activeServices = services.filter((service) => service.status === 'active');
  const draftServices = services.filter((service) => service.status === 'draft');
  const pausedServices = services.filter((service) => service.status === 'paused');

  const filteredServices =
    serviceFilter === 'all' ? services : services.filter((service) => service.status === serviceFilter);

  return (
    <div className="min-h-main">
      <main className="container py-8">
        {/* Botones de Navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <Link href={`/profile/${profileId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Volver al Perfil</h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/profile/${profileId}/my-services/new`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Nuevo Servicio</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
            className={`border-border cursor-pointer transition-shadow ${serviceFilter === 'paused' ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setServiceFilter('paused')}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{pausedServices.length}</div>
                <p className="text-sm text-muted-foreground">Pausados</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`border-border cursor-pointer transition-shadow ${serviceFilter === 'draft' ? 'ring-2 ring-gray-400' : ''}`}
            onClick={() => setServiceFilter('draft')}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{draftServices.length}</div>
                <p className="text-sm text-muted-foreground">Borradores</p>
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

        {/* Lista de Servicios */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Todos los Servicios</h3>
            <div className="text-sm text-muted-foreground">{services.length} servicios</div>
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
                        {service.image ? (
                          <img
                            src={service.image}
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
                              {getStatusBadge(service.status)}
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200">
                                {service.category}
                              </span>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {service.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {service.duration}
                              </div>
                            </div>
                          </div>

                          {/* Menú de Acciones */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
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
                        </div>

                        {/* Precio y Rating */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-lg font-semibold text-green-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {service.price.toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="flex">{renderStars(service.rating)}</div>
                              <span className="text-sm text-muted-foreground">
                                {service.rating} ({service.reviewCount} reseñas)
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
      </main>
    </div>
  );
}
