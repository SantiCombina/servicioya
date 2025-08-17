'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Card, CardContent, Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';
import {
  User,
  Star,
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Contract {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  providerName: string;
  providerAvatar?: string;
  providerRating: number;
  price: number;
  location: string;
  duration: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  contractDate: string;
  providerPhone?: string;
  providerEmail?: string;
}

export default function MyContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const params = useParams();
  const profileId = params.id;

  useEffect(() => {
    // Cargar contratos desde localStorage o datos demo
    const savedContracts = localStorage.getItem(`userContracts_${profileId}`);
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    } else {
      // Datos demo de contratos
      const demoContracts: Contract[] = [
        {
          id: '1',
          serviceTitle: 'Reparación de Notebook',
          serviceCategory: 'Tecnología',
          providerName: 'Carlos Méndez',
          providerAvatar: '',
          providerRating: 4.8,
          price: 3500,
          location: 'Buenos Aires',
          duration: '2 horas',
          scheduledDate: '2025-08-05',
          scheduledTime: '14:00',
          status: 'confirmed',
          description: 'Reparación de pantalla y revisión general del sistema',
          contractDate: '2025-07-25',
          providerPhone: '+54 9 11 1234-5678',
          providerEmail: 'carlos@email.com',
        },
        {
          id: '2',
          serviceTitle: 'Clases de Piano',
          serviceCategory: 'Educación',
          providerName: 'María González',
          providerAvatar: '',
          providerRating: 4.9,
          price: 2000,
          location: 'CABA',
          duration: '1 hora',
          scheduledDate: '2025-08-02',
          scheduledTime: '16:00',
          status: 'completed',
          description: 'Clase de piano nivel intermedio',
          contractDate: '2025-07-20',
          providerPhone: '+54 9 11 9876-5432',
          providerEmail: 'maria@email.com',
        },
        {
          id: '3',
          serviceTitle: 'Plomería Urgente',
          serviceCategory: 'Hogar',
          providerName: 'Roberto Silva',
          providerAvatar: '',
          providerRating: 4.5,
          price: 4500,
          location: 'Buenos Aires',
          duration: '3 horas',
          scheduledDate: '2025-07-30',
          scheduledTime: '10:00',
          status: 'pending',
          description: 'Reparación de cañería con pérdida en cocina',
          contractDate: '2025-07-28',
          providerPhone: '+54 9 11 5555-4444',
          providerEmail: 'roberto@email.com',
        },
      ];
      setContracts(demoContracts);
      localStorage.setItem(`userContracts_${profileId}`, JSON.stringify(demoContracts));
    }
  }, [profileId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pendiente
          </Badge>
        );
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Confirmado</Badge>;
      case 'in-progress':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">En Progreso</Badge>;
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
      case 'confirmed':
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const pendingContracts = contracts.filter((contract) => contract.status === 'pending');
  const confirmedContracts = contracts.filter(
    (contract) => contract.status === 'confirmed' || contract.status === 'in-progress',
  );
  const completedContracts = contracts.filter((contract) => contract.status === 'completed');

  // Filtrar contratos según el filtro activo
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

  return (
    <div className="min-h-main">
      <main className="container py-6">
        {/* Botón de Navegación */}
        <div className="mb-6">
          <Link href={`/profile/${profileId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border inline-block">
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
        </div>

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

        {/* Lista de Contratos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold text-foreground">Mis Contratos</h3>
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
              {filteredContracts.map((contract) => (
                <Card key={contract.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Información Principal */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(contract.status)}
                              <h4 className="text-lg font-semibold text-foreground">{contract.serviceTitle}</h4>
                              {getStatusBadge(contract.status)}
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{contract.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                                {contract.serviceCategory}
                              </span>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{contract.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{contract.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-semibold">${contract.price.toLocaleString('es-AR')}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Información del Proveedor */}
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={contract.providerAvatar || '/placeholder.svg'} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <User className="w-5 h-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{contract.providerName}</p>
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center space-x-1">
                                    {renderStars(contract.providerRating)}
                                  </div>
                                  <span className="text-sm text-muted-foreground">({contract.providerRating})</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {contract.providerPhone && (
                                <Button variant="outline" size="sm">
                                  <Phone className="w-4 h-4" />
                                </Button>
                              )}
                              {contract.providerEmail && (
                                <Button variant="outline" size="sm">
                                  <Mail className="w-4 h-4" />
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Fecha y Hora Programada */}
                        <div className="bg-primary/5 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground">Fecha Programada</span>
                          </div>
                          <p className="text-foreground">
                            {formatDate(contract.scheduledDate)} a las {contract.scheduledTime}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Contratado el {new Date(contract.contractDate).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col space-y-2 lg:ml-6">
                        {contract.status === 'pending' && (
                          <>
                            <Button size="sm" className="w-full lg:w-auto">
                              Confirmar
                            </Button>
                            <Button variant="outline" size="sm" className="w-full lg:w-auto">
                              Cancelar
                            </Button>
                          </>
                        )}
                        {contract.status === 'confirmed' && (
                          <Button variant="outline" size="sm" className="w-full lg:w-auto">
                            Ver Detalles
                          </Button>
                        )}
                        {contract.status === 'completed' && (
                          <>
                            <Button size="sm" className="w-full lg:w-auto">
                              Calificar
                            </Button>
                            <Button variant="outline" size="sm" className="w-full lg:w-auto">
                              Contratar Nuevamente
                            </Button>
                          </>
                        )}
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
