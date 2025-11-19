'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { userSignInSchema, UserSignInValues } from '@/components/login/user-signin-schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { userSignIn } from './actions';

type LoginFormProps = {
  redirectTo?: string;
};

const fieldVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const { executeAsync, isExecuting } = useAction(userSignIn, {
    onSuccess: ({ data }) => {
      if (data?.redirectUrl) {
        router.push(data.redirectUrl);
      }
    },
  });

  const methods = useForm<UserSignInValues>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: '',
      password: '',
      redirectTo: redirectTo,
    },
  });

  const onSubmit = async (data: UserSignInValues) => {
    executeAsync(data);
  };

  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
        <motion.div {...fieldVariants} transition={{ duration: 0.3, delay: 0.1 }}>
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" id="email" placeholder="Ingresa tu email" {...field} />
                </FormControl>
                <div className="min-h-5 -mt-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div {...fieldVariants} transition={{ duration: 0.3, delay: 0.2 }}>
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" id="password" placeholder="Ingresa tu contraseña" {...field} />
                </FormControl>
                <div className="min-h-5 -mt-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button type="submit" className="w-full" disabled={isExecuting}>
            {isExecuting ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
