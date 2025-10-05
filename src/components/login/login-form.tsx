'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
