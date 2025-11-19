'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { userSignUp } from './actions';
import { userSignupSchema, UserSignupValues } from './user-signup-schema';

type SignupFormProps = {
  redirectTo?: string;
};

const fieldVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
};

export function SignupForm({ redirectTo }: SignupFormProps) {
  const router = useRouter();
  const { executeAsync, isExecuting } = useAction(userSignUp, {
    onSuccess: ({ data }) => {
      if (data?.redirectUrl) {
        router.push(data.redirectUrl);
      }
    },
  });

  const methods = useForm<UserSignupValues>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirectTo: redirectTo,
    },
  });

  const onSubmit = async (data: UserSignupValues) => {
    executeAsync(data);
  };

  return (
    <Form {...methods}>
      <form className="space-y-1" onSubmit={methods.handleSubmit(onSubmit)}>
        <motion.div {...fieldVariants} transition={{ duration: 0.3, delay: 0.1 }}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ingresa tu nombre" {...field} />
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ingresa tu email" {...field} />
                </FormControl>
                <div className="min-h-5 -mt-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div {...fieldVariants} transition={{ duration: 0.3, delay: 0.3 }}>
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Crea una contraseña" {...field} />
                </FormControl>
                <div className="min-h-5 -mt-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div {...fieldVariants} transition={{ duration: 0.3, delay: 0.4 }}>
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirma tu contraseña" {...field} />
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
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button type="submit" className="w-full" disabled={isExecuting}>
            {isExecuting ? 'Creando...' : 'Crear cuenta'}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
