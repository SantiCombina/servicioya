import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from './login-form';
import Link from 'next/link';

export function LoginCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Link href="/" className="text-2xl font-bold">
          <CardTitle className="text-2xl font-bold m-0 p-0">ServicioYa</CardTitle>
        </Link>
        <CardDescription className="text-lg">Iniciar Sesión</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground">
          ¿Es tu primera vez?{' '}
          <Link href="/signup" className="underline hover:text-foreground">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
