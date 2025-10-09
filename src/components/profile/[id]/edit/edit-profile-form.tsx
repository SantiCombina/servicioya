'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/ui/user-avatar';
import { userUpdateSchema, type UserUpdateValues } from '@/lib/schemas/user-update-schema';
import { Location, Media, User } from '@/payload-types';

import { userUpdate, uploadAvatar } from './actions';

interface Props {
  user: User;
  locations: Location[];
}

export function EditProfileForm({ user, locations }: Props) {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const { executeAsync, isExecuting } = useAction(userUpdate, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        router.push(`/profile/${result.data.userId}`);
      }
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    },
  });

  const { executeAsync: uploadAvatarAsync, isExecuting: isUploadingAvatar } = useAction(uploadAvatar, {
    onSuccess: (result) => {
      if (result.data?.success && result.data.imageId) {
        form.setValue('avatar', result.data.imageId);
      }
    },
    onError: (error) => {
      console.error('Error uploading avatar:', error);
      toast.error('Error al subir el avatar');
      setAvatarPreview(null);
    },
  });

  const form = useForm<UserUpdateValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name || '',
      phone: user.phone || '',
      dni: user.dni || undefined,
      location: user.location ? (typeof user.location === 'object' ? user.location.id : user.location) : undefined,
      address: user.address || '',
      avatar: typeof user.avatar === 'object' ? user.avatar?.id : user.avatar,
    },
  });

  useEffect(() => {
    if (user.avatar && typeof user.avatar === 'object') {
      setAvatarPreview((user.avatar as Media).url || null);
    }
  }, [user.avatar]);

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
        setAvatarRemoved(false);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      await uploadAvatarAsync({ formData });
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarRemoved(true);
    form.setValue('avatar', null);

    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  async function onSubmit(values: UserUpdateValues) {
    executeAsync({
      ...values,
      userId: user.id,
    });
  }

  if (isExecuting) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Editar Perfil</h1>
          <p className="text-muted-foreground">Actualiza tu información personal y preferencias</p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Editar Perfil</h1>
        <p className="text-muted-foreground">Actualiza tu información personal y preferencias</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Avatar Section - Centrado */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <UserAvatar
                    name={user.name}
                    avatar={avatarRemoved ? undefined : avatarPreview ? ({ url: avatarPreview } as Media) : user.avatar}
                    className="w-24 h-24"
                  />
                </div>

                {/* Avatar Buttons */}
                <div className="flex gap-3">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploadingAvatar}
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {isUploadingAvatar
                      ? 'Subiendo...'
                      : avatarPreview || (user.avatar && !avatarRemoved)
                        ? 'Cambiar'
                        : 'Subir'}
                  </Button>
                  {(avatarPreview || user.avatar) && !avatarRemoved && (
                    <Button type="button" variant="outline" size="sm" onClick={handleRemoveAvatar}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-center">JPG, PNG, GIF (máx. 5MB)</p>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Juan Pérez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teléfono y DNI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: +54 11 1234-5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej: 12345678" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Ubicación y Dirección */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad/Localidad</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona tu ubicación" />
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

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Av. Corrientes 1234, CABA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => router.push(`/profile/${user.id}`)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isExecuting || isUploadingAvatar}>
                  {isExecuting ? 'Guardando...' : isUploadingAvatar ? 'Subiendo imagen...' : 'Guardar cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
