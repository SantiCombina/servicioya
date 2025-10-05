import { Search, Users, Shield } from 'lucide-react';

import { Card } from '@/components/ui/card';

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">¿Cómo Funciona?</h3>
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
  );
}
