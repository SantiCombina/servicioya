'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { userSignInSchema, UserSignInValues } from '@/lib/schemas/user-signin-schema';
import { userSignIn } from './actions';

export function LoginForm() {
  const { executeAsync, isExecuting } = useAction(userSignIn);

  const methods = useForm<UserSignInValues>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserSignInValues) => {
    executeAsync(data);
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
        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </Form>
  );
}
