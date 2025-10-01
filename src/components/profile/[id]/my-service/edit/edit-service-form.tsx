'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { serviceUpdateSchema, type ServiceUpdateValues } from '@/lib/schemas/service-update-schema';
import { Category, Location, Media, Service } from '@/payload-types';

import { serviceUpdate, uploadServiceImage } from './actions';

interface Props {
  service: Service;
  categories: Category[];
  locations: Location[];
  profileId: string;
}

export function EditServiceForm({ service, categories, locations, profileId }: Props) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { executeAsync, isExecuting } = useAction(serviceUpdate, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        router.push(`/profile/${profileId}/my-services`);
      }
    },
    onError: (error) => {
      console.error('Error updating service:', error);
      toast.error('Error al actualizar el servicio');
    },
  });

  const { executeAsync: uploadImageAsync, isExecuting: isUploadingImage } = useAction(uploadServiceImage, {
    onSuccess: (result) => {
      if (result.data?.success && result.data.imageId) {
        form.setValue('imageId', result.data.imageId);
      }
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      setImagePreview(null);
    },
  });

  const form = useForm<ServiceUpdateValues>({
    resolver: zodResolver(serviceUpdateSchema),
    defaultValues: {
      title: service.title || '',
      description: service.description || '',
      categoryId: typeof service.category === 'object' ? service.category.id : service.category,
      locationId: typeof service.location === 'object' ? service.location.id : service.location,
      priceFrom: service.priceFrom || undefined,
      availability: service.availability || '',
      imageId: typeof service.image === 'object' ? service.image?.id : service.image,
      isActive: service.isActive ?? true,
    },
  });

  useEffect(() => {
    if (service.image && typeof service.image === 'object') {
      setImagePreview((service.image as Media).url || null);
    }
  }, [service.image]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      await uploadImageAsync({ formData });
    }
  };

  async function onSubmit(values: ServiceUpdateValues) {
    executeAsync({
      ...values,
      serviceId: service.id,
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Editar Servicio</h1>
        <p className="text-muted-foreground">Actualiza la información de tu servicio</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Imagen Section */}
              <div className="space-y-4">
                <Label>Imagen del servicio *</Label>

                {/* Image Preview */}
                {(imagePreview || service.image) && (
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={
                        imagePreview ||
                        (typeof service.image === 'object' && service.image ? service.image.url : '') ||
                        ''
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Image Buttons */}
                <div className="flex justify-center">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                      {isUploadingImage ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isUploadingImage
                          ? 'Subiendo...'
                          : imagePreview || service.image
                            ? 'Cambiar imagen'
                            : 'Subir imagen'}
                      </span>
                    </div>
                  </Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploadingImage}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">JPG, PNG máximo 5MB - Imagen obligatoria</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Título */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del servicio *</FormLabel>
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
                        <Textarea
                          placeholder="Describe tu servicio en detalle..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoría y Ubicación */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría *</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value?.toString()}
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
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value?.toString()}
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
                                {location.province && `, ${location.province}`}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priceFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio desde (ARS) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: 2500" {...field} />
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

                {/* Estado Activo */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Servicio activo</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Los servicios activos aparecen en las búsquedas públicas
                        </div>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/profile/${profileId}/my-services`)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isExecuting || isUploadingImage}>
                  {isExecuting ? 'Guardando...' : isUploadingImage ? 'Subiendo imagen...' : 'Guardar cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
