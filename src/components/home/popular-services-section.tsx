import { Wrench, Zap, Home, Users, Search, Shield } from 'lucide-react';
import { Card } from '../ui/card';

export function PopularServicesSection() {
  return (
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
  );
}
