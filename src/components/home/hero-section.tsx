import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-26 md:px-24">
      <div className="container space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight md:text-7xl">
            Conecta con <span className="text-primary">profesionales</span> de confianza
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            El marketplace que conecta a quienes ofrecen servicios con quienes los necesitan. Encuentra profesionales
            cerca de ti de manera rápida y segura.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="transition-all duration-300 group">
            <Link href="/login">
              Comenzar ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explorar servicios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
