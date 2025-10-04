import { ServiceCard } from '@/components/services/service-card/service-card';
import { Service } from '@/payload-types';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {services.map((service: Service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
