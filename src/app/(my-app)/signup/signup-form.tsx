'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userSignupSchema, UserSignupValues } from '@/lib/schemas/user-signup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function SignupForm() {
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
      // Aquí puedes manejar el registro, por ejemplo, enviando los datos a una API
      console.log('Datos de registro:', data);
      // Redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al registrarse:', error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <Button type="submit" className="w-full">
          Crear Cuenta
        </Button>
      </form>
    </Form>
  );
}
