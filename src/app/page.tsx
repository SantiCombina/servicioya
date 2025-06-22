import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-6 min-h-main md:p-24">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Bienvenido a ServicioYa</h1>

        <p className="text-lg text-muted-foreground">
          El marketplace que conecta a quienes ofrecen servicios con quienes los necesitan. Encuentra profesionales
          cerca de ti.
        </p>

        <Button asChild size="lg" className="transition-all duration-300 group">
          <Link href="/login">
            Comenzar
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
