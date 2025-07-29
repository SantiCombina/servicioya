import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Search, Shield, Star, Users, Wrench, Zap, Home } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
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
              <Link href="#servicios">Explorar servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="px-6 py-16 md:px-24 bg-muted">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Servicios populares</h2>
            <p className="text-lg text-muted-foreground">Encuentra el profesional que necesitas para tu proyecto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: 'Plomería', description: 'Reparaciones y instalaciones de plomería' },
              { icon: Zap, title: 'Electricidad', description: 'Servicios eléctricos profesionales' },
              { icon: Home, title: 'Hogar', description: 'Limpieza, jardinería y mantenimiento' },
              { icon: Users, title: 'Belleza', description: 'Servicios de peluquería y estética' },
              { icon: Search, title: 'Tecnología', description: 'Reparación de dispositivos electrónicos' },
              { icon: Shield, title: 'Seguridad', description: 'Instalación de sistemas de seguridad' },
            ].map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 md:px-24 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">¿Por qué elegir ServicioYa?</h2>
            <p className="text-lg text-muted-foreground">
              Ofrecemos una plataforma segura y confiable para encontrar los mejores profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold">Profesionales verificados</h3>
              <p className="text-muted-foreground">
                Todos nuestros profesionales pasan por un riguroso proceso de verificación
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">Reseñas reales</h3>
              <p className="text-muted-foreground">
                Sistema de calificaciones y reseñas transparente de clientes reales
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Búsqueda inteligente</h3>
              <p className="text-muted-foreground">
                Encuentra profesionales cerca de ti con nuestra búsqueda por ubicación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-muted">
        <div className="container px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">¿Cómo Funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Busca</h4>
              <p className="text-muted-foreground">Encuentra el servicio que necesitas por categoría o ubicación</p>
            </Card>
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Conecta</h4>
              <p className="text-muted-foreground">Revisa perfiles, calificaciones y contacta al profesional ideal</p>
            </Card>
            <Card className="text-center p-8 bg-background border-none shadow-none">
              <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Contrata</h4>
              <p className="text-muted-foreground">Agenda el servicio y califica tu experiencia al finalizar</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Card className="bg-card p-6">
              <div className="text-4xl font-bold mb-2 text-primary">1,200+</div>
              <div className="text-muted-foreground">Profesionales</div>
            </Card>
            <Card className="bg-card p-6">
              <div className="text-4xl font-bold mb-2 text-primary">15,000+</div>
              <div className="text-muted-foreground">Servicios Realizados</div>
            </Card>
            <Card className="bg-card p-6">
              <div className="text-4xl font-bold mb-2 text-primary">4.8</div>
              <div className="text-muted-foreground">Calificación Promedio</div>
            </Card>
            <Card className="bg-card p-6">
              <div className="text-4xl font-bold mb-2 text-primary">50+</div>
              <div className="text-muted-foreground">Ciudades</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-24 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">¿Listo para encontrar el profesional perfecto?</h2>
          <p className="text-lg opacity-90">
            Únete a miles de usuarios que ya confían en ServicioYa para sus proyectos
          </p>
          <Button asChild size="lg" variant="secondary" className="transition-all duration-300 group">
            <Link href="/signup">
              Crear cuenta gratis
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
