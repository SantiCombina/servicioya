import { CheckCircle, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SignupCard } from '@/components/signup/signup-card';

type SignUpPageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect } = await searchParams;

  return (
    <div className="flex min-h-dvh">
      <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-between p-10 lg:p-14">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-white/20 rounded-lg p-1">
            <Image src="/icon.png" alt="ServicioYa" width={32} height={32} className="rounded" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">ServicioYa</span>
        </Link>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight">
              Únete a la comunidad de servicios más grande de Argentina
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Ofrece o contrata servicios en minutos. Gratis para empezar.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: CheckCircle, text: 'Crea tu perfil en menos de 2 minutos' },
              { icon: Star, text: 'Recibe reseñas y construye tu reputación' },
              { icon: Users, text: 'Accede a miles de clientes potenciales' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-primary-foreground/90">
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary-foreground/60 text-sm">© {new Date().getFullYear()} ServicioYa</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-background">
        <SignupCard redirectTo={redirect} />
      </div>
    </div>
  );
}
