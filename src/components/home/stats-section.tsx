import { Card } from '@/components/ui/card';

export function StatsSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
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
  );
}
