import { Separator } from '@/components/ui';
import { Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SY</span>
              </div>
              <span className="font-bold text-xl text-foreground flex">ServicioYa</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma líder para encontrar servicios profesionales de calidad en tu zona, conectando profesionales
              verificados con clientes que buscan soluciones confiables.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Enlaces Útiles</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span>Servicios</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span>Sobre Nosotros</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categorías Populares</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services?category=plomeria"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Plomería
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=electricidad"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Electricidad
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=jardineria"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Jardinería
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=carpinteria"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Carpintería
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contáctanos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/543564575274"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={16} />
                  <span>+54 3564 575274</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:santicombina@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  <span>contacto@servicioya.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ServicioYa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
