import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { LoginForm } from './login-form';

type LoginCardProps = {
  redirectTo?: string;
};

export function LoginCard({ redirectTo }: LoginCardProps) {
  const signupUrl = redirectTo ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup';
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Link href="/" className="text-2xl font-bold">
          <CardTitle className="text-2xl font-bold m-0 p-0">ServicioYa</CardTitle>
        </Link>
        <CardDescription className="text-lg">Iniciar Sesión</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm redirectTo={redirectTo} />
        <div className="text-center text-sm text-muted-foreground">
          ¿Es tu primera vez?{' '}
          <Link href={signupUrl} className="underline hover:text-foreground">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
