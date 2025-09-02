import { Suspense } from 'react';

import { getServices } from '@/app/services/service';
import { ServicesInteractive } from '@/components/services/services-interactive';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Suspense fallback={<div className="min-h-main flex items-center justify-center">Cargando servicios...</div>}>
      <ServicesInteractive initialServices={services} />
    </Suspense>
  );
}
