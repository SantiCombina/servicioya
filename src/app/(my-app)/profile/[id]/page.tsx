'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Star, StarHalf, Briefcase, FileText, Edit, Mail, MapPin, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface UserProfile {
  nombre: string;
  apellido: string;
  email: string;
  localidad: string;
  domicilio: string;
  telefono: string;
  dni: string;
  avatar?: string;
  rating: number;
  totalReviews: number;
  serviciosActivos: number;
  contratacionesActivas: number;
  fechaRegistro: string;
}

export default function ProfilePage() {
  const params = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nombre: 'Usuario',
    apellido: 'Demo',
    email: 'usuario@demo.com',
    localidad: 'Buenos Aires',
    domicilio: 'Av. Corrientes 1234',
    telefono: '+54 9 11 1234-5678',
    dni: '12.345.678',
    avatar: '',
    rating: 4.5,
    totalReviews: 8,
    serviciosActivos: 3,
    contratacionesActivas: 2,
    fechaRegistro: '2024-01-15',
  });

  useEffect(() => {
    // Cargar datos del perfil desde localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setUserProfile((prev) => ({
        ...prev,
        ...profileData,
      }));
    }
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-6 h-6 fill-yellow-400 text-yellow-400" />);
    }

    // Media estrella
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-6 h-6 fill-yellow-400 text-yellow-400" />);
    }

    // Estrellas vacías
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-6 h-6 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-main">
      <main className="container py-8">
        {/* Perfil Principal */}
        <Card className="mb-8 relative bg-card border-border">
          {/* Botón Editar Perfil - pequeño en esquina superior derecha */}
          <div className="absolute top-4 right-4">
            <Link href={`/profile/${params?.id}/edit`}>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Edit className="w-3 h-3 mr-1" />
              </Button>
            </Link>
          </div>

          <CardContent className="pt-8">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Avatar */}
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile.avatar || '/placeholder.svg'} />
                <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              {/* Información básica */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {userProfile.nombre} {userProfile.apellido}
                </h2>
                <div className="flex items-center justify-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{userProfile.email}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-1">{renderStars(userProfile.rating)}</div>
                <p className="text-sm text-muted-foreground">
                  {userProfile.rating.toFixed(1)} de 5 ({userProfile.totalReviews} reseñas)
                </p>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{userProfile.localidad}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{userProfile.telefono}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Desde {new Date(userProfile.fechaRegistro).getFullYear()}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>DNI: {userProfile.dni}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Servicios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{userProfile.serviciosActivos}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contrataciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{userProfile.contratacionesActivas}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calificación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{userProfile.rating.toFixed(1)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Botones de Navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href={`/profile/${params?.id}/my-services`} className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mis Servicios</h3>
                  <p className="text-sm text-muted-foreground">Gestiona y publica los servicios que ofreces</p>
                </div>
                <Badge variant="secondary">{userProfile.serviciosActivos} activos</Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/profile/${params?.id}/my-contracts`} className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mis Contratos</h3>
                  <p className="text-sm text-muted-foreground">Revisa los contratos que has realizado</p>
                </div>
                <Badge variant="secondary">{userProfile.contratacionesActivas} activos</Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
