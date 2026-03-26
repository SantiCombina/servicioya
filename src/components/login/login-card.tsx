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
  initial: { opacity: 0, scale: 0.97, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

export function LoginCard({ redirectTo }: LoginCardProps) {
  const signupUrl = redirectTo ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup';

  return (
    <motion.div className="w-full max-w-sm mx-auto" {...cardVariants}>
      <Card className="border-border/60 shadow-lg">
        <CardHeader className="text-center pb-4">
          <Link href="/" className="flex items-center justify-center gap-2 mb-1 md:hidden">
            <Image src="/icon.png" alt="ServicioYa" width={32} height={32} className="rounded" />
            <span className="font-bold text-lg">ServicioYa</span>
          </Link>
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tus datos para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-6 pb-6">
          <LoginForm redirectTo={redirectTo} />
          <div className="text-center text-sm text-muted-foreground">
            ¿Es tu primera vez?{' '}
            <Link
              href={signupUrl}
              className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline font-medium transition-colors"
            >
              Regístrate gratis
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
