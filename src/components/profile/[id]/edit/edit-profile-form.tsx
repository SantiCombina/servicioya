'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userUpdateSchema, type UserUpdateValues } from '@/lib/schemas/user-update-schema';
import { userUpdate } from './actions';
import { User } from '@/payload-types';
import { toast } from 'sonner';

interface Props {
  user: User;
}

export function EditProfileForm({ user }: Props) {
  const router = useRouter();

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

  const form = useForm<UserUpdateValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name || '',
      phone: user.phone || '',
      dni: user.dni || undefined,
    },
  });

  async function onSubmit(values: UserUpdateValues) {
    executeAsync({
      ...values,
      userId: user.id,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} />
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
                <Input type="number" placeholder="12345678" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          {isExecuting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </form>
    </Form>
  );
}
