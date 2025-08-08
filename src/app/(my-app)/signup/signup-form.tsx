'use client';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { userSignupSchema, UserSignupValues } from '@/lib/schemas/user-signup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createUser } from '@/app/actions/user/create-user';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const router = useRouter();
  const methods = useForm<UserSignupValues>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: UserSignupValues) => {
    try {
      const result = await createUser({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: 'user',
        },
      });
      if (result && !result.error && result.success) {
        router.push('/');
      } else {
        methods.setError('root', { type: 'manual', message: result?.error || 'Error al crear usuario' });
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      methods.setError('root', { type: 'manual', message: 'Error inesperado al registrarse' });
    }
  };

  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
        {methods.formState.errors.root && (
          <div
            className={`mb-2 text-sm ${methods.formState.errors.root.message === '¡Registro exitoso!' ? 'text-green-600' : 'text-red-500'}`}
          >
            {methods.formState.errors.root.message}
          </div>
        )}
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ingresa tu nombre" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ingresa tu email" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Crea una contraseña" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirma tu contraseña" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? 'Creando...' : 'Crear Cuenta'}
        </Button>
      </form>
    </Form>
  );
}
