import { Suspense } from 'react';

import { ServicesInteractive } from '@/components/services/services-interactive';

import { getServicesWithCompletedJobs } from './actions';

export default async function ServicesPage() {
  const services = await getServicesWithCompletedJobs();

  return (
    <Suspense fallback={<div className="min-h-main flex items-center justify-center">Cargando servicios...</div>}>
      <ServicesInteractive initialServices={services} />
    </Suspense>
  );
}
