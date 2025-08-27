'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { ArrowLeft, Save, Plus, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { serviceCreateSchema, ServiceCreateValues } from '@/lib/schemas/service-create-schema';
import { createService } from '@/app/services/service/create-service';
import { getCategories } from '@/app/services/category/get-categories';
import { getLocations } from '@/app/services/location/get-locations';
import { uploadImage } from '@/app/services/media/upload-image';
import { getCurrentUser } from '@/app/services/user/get-current-user';
import { Category, Location } from '@/payload-types';
import { toast } from 'sonner';

export default function NewServicePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<ServiceCreateValues>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: 0,
      locationId: 0,
      priceFrom: 0,
      availability: '',
      isActive: true,
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [user, categoriesData, locationsData] = await Promise.all([
          getCurrentUser(),
          getCategories(),
          getLocations(),
        ]);

        setCurrentUser(user);
        setCategories(categoriesData);
        setLocations(locationsData);

        // Verificar permisos
        if (!user || (user.id.toString() !== profileId && user.role !== 'admin')) {
          router.push('/login');
          return;
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Error al cargar los datos');
      }
    };

    loadData();
  }, [profileId, router]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar tipo y tamaño
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede ser mayor a 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Subir imagen
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadImage(formData);
      if (result.success && result.imageId) {
        setUploadedImageId(result.imageId);
        toast.success('Imagen subida correctamente');
      } else {
        toast.error(result.message);
        setPreviewImage(null);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      setPreviewImage(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUploadedImageId(null);
  };

  const onSubmit = async (values: ServiceCreateValues, isDraft = false) => {
    if (!currentUser) {
      toast.error('Debes estar autenticado para crear un servicio');
      return;
    }

    setIsLoading(true);

    try {
      const serviceData = {
        ...values,
        imageId: uploadedImageId || undefined,
        providerId: currentUser.id,
        isActive: isDraft ? false : values.isActive,
      };

      const result = await createService(serviceData);

      if (result.success) {
        toast.success(isDraft ? 'Servicio guardado como borrador' : 'Servicio creado correctamente');
        router.push(`/profile/${profileId}/my-services`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Error al crear el servicio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (isDraft = false) => {
    return form.handleSubmit((values) => onSubmit(values, isDraft));
  };

  return (
    <div className="min-h-main">
      <main className="container py-6">
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

        <Form {...form}>
          <form onSubmit={handleSubmit()}>
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
                  {previewImage ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                        disabled={uploadingImage}
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
                        {uploadingImage ? (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {uploadingImage ? 'Subiendo...' : previewImage ? 'Cambiar imagen' : 'Subir imagen'}
                        </span>
                      </div>
                    </Label>
                    <Input
                      id="serviceImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">JPG, PNG máximo 5MB</p>
                </div>

                {/* Título */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Servicio *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Reparación de computadoras" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Descripción */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe tu servicio en detalle..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoría y Ubicación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría *</FormLabel>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación *</FormLabel>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una ubicación" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.id.toString()}>
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Precio y Disponibilidad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priceFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio desde (ARS) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2500"
                            min="0"
                            step="50"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disponibilidad</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Lunes a Viernes 9-18hs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    onClick={handleSubmit(true)}
                  >
                    Guardar como Borrador
                  </Button>

                  <Button type="submit" className="flex-1" disabled={isLoading}>
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
        </Form>
      </main>
    </div>
  );
}
