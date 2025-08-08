'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ArrowLeft, Save, Plus, Upload, X } from 'lucide-react';
import Link from 'next/link';

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

const categories = [
  'Tecnología',
  'Educación',
  'Salud',
  'Hogar',
  'Automóvil',
  'Belleza',
  'Deportes',
  'Entretenimiento',
  'Profesional',
  'Otros',
];

const durations = [
  '30 minutos',
  '1 hora',
  '1.5 horas',
  '2 horas',
  '3 horas',
  '4 horas',
  'Medio día',
  'Día completo',
  'Varios días',
];

const locations = [
  'Buenos Aires',
  'CABA',
  'GBA Norte',
  'GBA Sur',
  'Córdoba',
  'Rosario',
  'Mendoza',
  'La Plata',
  'Tucumán',
  'Salta',
  'Otros',
];

export default function NewServicePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id;

  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    duration: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setServiceData((prev) => ({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setServiceData((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setServiceData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!serviceData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!serviceData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!serviceData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!serviceData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    } else if (isNaN(Number(serviceData.price)) || Number(serviceData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0';
    }

    if (!serviceData.location.trim()) {
      newErrors.location = 'La ubicación es requerida';
    }

    if (!serviceData.duration) {
      newErrors.duration = 'La duración es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, status: 'active' | 'draft') => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular guardado (aquí iría la llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Crear nuevo servicio
      const newService: Service = {
        id: Date.now().toString(),
        title: serviceData.title,
        description: serviceData.description,
        category: serviceData.category,
        price: Number(serviceData.price),
        location: serviceData.location,
        duration: serviceData.duration,
        rating: 0,
        reviewCount: 0,
        status: status,
        image: serviceData.image,
        createdAt: new Date().toISOString().split('T')[0],
      };

      // Obtener servicios existentes y agregar el nuevo
      const existingServices = localStorage.getItem(`userServices_${profileId}`);
      const services = existingServices ? JSON.parse(existingServices) : [];
      services.push(newService);
      localStorage.setItem(`userServices_${profileId}`, JSON.stringify(services));

      // Redirigir a mis servicios
      router.push(`/profile/${profileId}/my-services`);
    } catch (error) {
      console.error('Error al crear el servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-main">
      <main className="container py-8">
        {/* Botón de Navegación */}
        <div className="mb-6">
          <Link href={`/profile/${profileId}/my-services`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border inline-block">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Volver a Mis Servicios</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <form onSubmit={(e) => handleSubmit(e, 'active')}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Crear Nuevo Servicio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Imagen del Servicio */}
              <div className="space-y-4">
                <Label>Imagen del Servicio</Label>
                {serviceData.image ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                    <img src={serviceData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Sube una imagen para tu servicio</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-center">
                  <Label htmlFor="serviceImage" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {serviceData.image ? 'Cambiar imagen' : 'Subir imagen'}
                      </span>
                    </div>
                  </Label>
                  <Input
                    id="serviceImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">JPG, PNG máximo 5MB</p>
              </div>

              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">Título del Servicio *</Label>
                <Input
                  id="title"
                  type="text"
                  value={serviceData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={errors.title ? 'border-destructive' : ''}
                  placeholder="Ej: Reparación de computadoras"
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={serviceData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={errors.description ? 'border-destructive' : ''}
                  placeholder="Describe tu servicio en detalle..."
                  rows={4}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              {/* Categoría y Duración */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={serviceData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración *</Label>
                  <Select value={serviceData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger className={errors.duration ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona duración" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.duration && <p className="text-sm text-destructive">{errors.duration}</p>}
                </div>
              </div>

              {/* Precio y Ubicación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (ARS) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={serviceData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={errors.price ? 'border-destructive' : ''}
                    placeholder="2500"
                    min="0"
                    step="50"
                  />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Select value={serviceData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona una ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href={`/profile/${profileId}/my-services`} className="flex-1">
                  <Button type="button" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </Link>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e, 'draft')}
                >
                  Guardar como Borrador
                </Button>

                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e, 'active')}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Publicar Servicio
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
