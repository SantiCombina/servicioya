'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userLoginSchema, type UserLoginValues } from '@/lib/schemas/user-login-schema';

export function LoginForm() {
  const methods = useForm<UserLoginValues>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserLoginValues) => {
    try {
      // Aquí puedes manejar el inicio de sesión, por ejemplo, enviando los datos a una API
      console.log('Datos de inicio de sesión:', data);
      // Redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };
  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <Button type="submit" className="w-full">
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
}
