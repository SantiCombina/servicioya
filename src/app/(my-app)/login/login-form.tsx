'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { userLoginSchema, type UserLoginValues } from '@/lib/schemas/user-login-schema';

import { loginUser } from '@/app/actions/user/login-user';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const methods = useForm<UserLoginValues>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserLoginValues) => {
    try {
      const result = await loginUser({ data });
      if (result.success) {
        router.push('/');
      } else {
        methods.setError('root', { type: 'manual', message: result.message });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      methods.setError('root', { type: 'manual', message: 'Error inesperado al iniciar sesión' });
    }
  };

  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
        {methods.formState.errors.root && (
          <div className="text-red-500 text-sm mb-2">{methods.formState.errors.root.message}</div>
        )}
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" id="email" placeholder="Ingresa tu email" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" id="password" placeholder="Ingresa tu contraseña" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem] -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </Form>
  );
}
