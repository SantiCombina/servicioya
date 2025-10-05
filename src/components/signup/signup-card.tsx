import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { SignupForm } from './signup-form';

export function SignupCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Link href="/" className="text-2xl font-bold">
          <CardTitle className="text-2xl font-bold">ServicioYa</CardTitle>
        </Link>
        <CardDescription className="text-lg">Crear Cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignupForm />
        <div className="text-sm text-center text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="underline hover:text-foreground">
            Iniciar Sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
