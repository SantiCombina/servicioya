import { Mail, MessageSquare, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/icon.png" alt="ServicioYa" width={32} height={32} className="h-8 w-8" />
              <span className="font-bold text-xl text-foreground flex">ServicioYa</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma que conecta profesionales verificados con clientes que buscan soluciones confiables en toda
              Argentina.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://instagram.com/servicioya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/servicioya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Enlaces Útiles</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categorías Populares</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Plomería', value: 'plomeria' },
                { label: 'Electricidad', value: 'electricidad' },
                { label: 'Jardinería', value: 'jardineria' },
                { label: 'Carpintería', value: 'carpinteria' },
              ].map(({ label, value }) => (
                <li key={value}>
                  <Link
                    href={`/services?category=${value}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/543564575274"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={15} />
                  <span>+54 3564 575274</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@servicioya.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={15} />
                  <span>contacto@servicioya.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-7" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ServicioYa. Todos los derechos reservados.</p>
          <p className="text-xs">Hecho con ❤️ en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}
