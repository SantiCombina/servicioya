'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { LoginForm } from './login-form';

type LoginCardProps = {
  redirectTo?: string;
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
};

const headerVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: 0.1 },
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay: 0.2 },
};

export function LoginCard({ redirectTo }: LoginCardProps) {
  const signupUrl = redirectTo ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup';

  return (
    <motion.div className="w-full max-w-md mx-auto" {...cardVariants}>
      <Card className="shadow-xl">
        <motion.div {...headerVariants}>
          <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Image src="/icon.png" alt="ServicioYa" width={32} height={32} className="rounded" />
              <CardTitle className="text-2xl font-bold m-0 p-0">ServicioYa</CardTitle>
            </Link>
            <CardDescription className="text-lg">Iniciar sesión</CardDescription>
          </CardHeader>
        </motion.div>
        <motion.div {...contentVariants}>
          <CardContent className="space-y-4">
            <LoginForm redirectTo={redirectTo} />
            <motion.div
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              ¿Es tu primera vez?{' '}
              <Link href={signupUrl} className="underline hover:text-foreground transition-colors">
                Regístrate
              </Link>
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
