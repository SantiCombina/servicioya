'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Label,
} from '@/components/ui';
import { User, Save, Camera, X } from 'lucide-react';
import Link from 'next/link';

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

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id;

  const [userProfile, setUserProfile] = useState<UserProfile>({
    nombre: '',
    apellido: '',
    email: '',
    localidad: '',
    domicilio: '',
    telefono: '',
    dni: '',
    avatar: '',
    rating: 0,
    totalReviews: 0,
    serviciosActivos: 0,
    contratacionesActivas: 0,
    fechaRegistro: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!userProfile.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!userProfile.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!userProfile.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userProfile.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!userProfile.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!userProfile.localidad.trim()) {
      newErrors.localidad = 'La localidad es requerida';
    }

    if (!userProfile.domicilio.trim()) {
      newErrors.domicilio = 'El domicilio es requerido';
    }

    if (!userProfile.dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular guardado (aquí iría la llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Guardar en localStorage
      localStorage.setItem('userProfile', JSON.stringify(userProfile));

      // Redirigir al perfil
      router.push(`/profile/${profileId}`);
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserProfile((prev) => ({
          ...prev,
          avatar: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setUserProfile((prev) => ({
      ...prev,
      avatar: '',
    }));
  };

  return (
    <div className="min-h-main">
      <main className="container py-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userProfile.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>

                  {userProfile.avatar && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm font-medium">Cambiar foto</span>
                    </div>
                  </Label>
                  <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  <p className="text-xs text-muted-foreground">JPG, PNG máximo 5MB</p>
                </div>
              </div>

              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={userProfile.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={errors.nombre ? 'border-destructive' : ''}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    type="text"
                    value={userProfile.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className={errors.apellido ? 'border-destructive' : ''}
                    placeholder="Tu apellido"
                  />
                  {errors.apellido && <p className="text-sm text-destructive">{errors.apellido}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* DNI y Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    type="text"
                    value={userProfile.dni}
                    onChange={(e) => handleInputChange('dni', e.target.value)}
                    className={errors.dni ? 'border-destructive' : ''}
                    placeholder="12.345.678"
                  />
                  {errors.dni && <p className="text-sm text-destructive">{errors.dni}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={userProfile.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className={errors.telefono ? 'border-destructive' : ''}
                    placeholder="+54 9 11 1234-5678"
                  />
                  {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
                </div>
              </div>

              {/* Domicilio y Localidad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domicilio">Domicilio *</Label>
                  <Input
                    id="domicilio"
                    type="text"
                    value={userProfile.domicilio}
                    onChange={(e) => handleInputChange('domicilio', e.target.value)}
                    className={errors.domicilio ? 'border-destructive' : ''}
                    placeholder="Av. Corrientes 1234"
                  />
                  {errors.domicilio && <p className="text-sm text-destructive">{errors.domicilio}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localidad">Localidad *</Label>
                  <Input
                    id="localidad"
                    type="text"
                    value={userProfile.localidad}
                    onChange={(e) => handleInputChange('localidad', e.target.value)}
                    className={errors.localidad ? 'border-destructive' : ''}
                    placeholder="Buenos Aires"
                  />
                  {errors.localidad && <p className="text-sm text-destructive">{errors.localidad}</p>}
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href={`/profile/${profileId}`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
