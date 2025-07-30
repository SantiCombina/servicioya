import { Shield, Star, Search } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="py-16">
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
            <p className="text-muted-foreground">Sistema de calificaciones y reseñas transparente de clientes reales</p>
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
  );
}
