'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { serviceCreateSchema, ServiceCreateValues } from '@/lib/schemas/service-create-schema';

import { loadNewServiceDataAction, serviceCreate, uploadImageActionSafe } from './actions';

export function NewServiceForm() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const {
    execute: loadData,
    result: loadDataResult,
    isExecuting: isLoadingData,
  } = useAction(loadNewServiceDataAction, {
    onSuccess: (result) => {
      if (!result.data?.user || (result.data.user.id.toString() !== profileId && result.data.user.role !== 'admin')) {
        router.push('/login');
        return;
      }
    },
    onError: (error) => {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    },
  });

  const { executeAsync: createService, isExecuting: isCreatingService } = useAction(serviceCreate, {
    onSuccess: (result) => {
      console.log('Service created successfully:', result);
      if (result.data?.success) {
        toast.success(result.data.message);
        router.push(`/profile/${profileId}/my-services`);
      } else {
        toast.error(result.data?.message || 'Error al crear el servicio');
      }
    },
    onError: (error) => {
      console.error('Error creating service:', error);
      toast.error('Error al crear el servicio');
    },
  });

  const { executeAsync: uploadImage } = useAction(uploadImageActionSafe, {
    onSuccess: (result) => {
      if (result.data?.imageId) {
        setUploadedImageId(result.data.imageId);
        methods.setValue('imageId', result.data.imageId);
      }
    },
    onError: (error) => {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      setPreviewImage(null);
    },
  });

  useEffect(() => {
    loadData({});
  }, [loadData]);

  const currentUser = loadDataResult?.data?.user || null;
  const categories = loadDataResult?.data?.categories || [];
  const locations = loadDataResult?.data?.locations || [];

  const methods = useForm<ServiceCreateValues>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: undefined,
      locationId: undefined,
      priceFrom: undefined,
      availability: '',
      imageId: undefined,
      isActive: true,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede ser mayor a 5MB');
      return;
    }

    try {
      setIsUploadingImage(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      await uploadImage({ formData });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      setPreviewImage(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (values: ServiceCreateValues) => {
    const serviceData = {
      ...values,
      imageId: uploadedImageId!,
      providerId: currentUser!.id,
      categoryId: values.categoryId!,
      locationId: values.locationId!,
      priceFrom: values.priceFrom!,
      availability: values.availability || '',
    };

    createService(serviceData);
  };

  if (isLoadingData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Servicio</h1>
        <p className="text-muted-foreground">Completa la información para crear tu servicio</p>
      </div>

      <Form {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(
              (values) => {
                if (uploadedImageId) {
                  methods.setValue('imageId', uploadedImageId);
                }
                onSubmit(values);
              },
              (errors) => {
                console.log('Validation errors:', errors);
              },
            )(e);
          }}
        >
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Label>Imagen del servicio *</Label>
                {previewImage ? (
                  <div className="relative max-w-sm mx-auto aspect-[5/4] rounded-lg overflow-hidden bg-muted">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover object-center" />
                  </div>
                ) : (
                  <div className="max-w-sm mx-auto aspect-[5/4] border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Sube una imagen para tu servicio (obligatorio)</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-center">
                  <Label htmlFor="serviceImage" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                      {isUploadingImage ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isUploadingImage ? 'Subiendo...' : previewImage ? 'Cambiar imagen' : 'Subir imagen'}
                      </span>
                    </div>
                  </Label>
                  <Input
                    id="serviceImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploadingImage}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">JPG, PNG máximo 5MB - Imagen obligatoria</p>
              </div>

              <FormField
                control={methods.control}
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

              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu servicio en detalle..."
                        className="min-h-[120px] max-h-[300px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={methods.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría *</FormLabel>
                      <Select
                        value={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                  control={methods.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación *</FormLabel>
                      <Select
                        value={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={methods.control}
                  name="priceFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio desde (ARS) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 5000"
                          min="1"
                          max="999999"
                          onFocus={(event) => event.target.select()}
                          {...field}
                          value={field.value === undefined || field.value === null ? '' : field.value}
                          onChange={(event) => {
                            const value = event.target.valueAsNumber;

                            if (event.target.value === '') {
                              field.onChange(undefined);
                            } else if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
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

              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6">
                <Link href={`/profile/${profileId}/my-services`} className="flex-1">
                  <Button type="button" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </Link>

                <Button type="submit" className="flex-1" disabled={isCreatingService || isUploadingImage}>
                  {isCreatingService ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Publicando...
                    </>
                  ) : isUploadingImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Subiendo imagen...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Publicar servicio
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
