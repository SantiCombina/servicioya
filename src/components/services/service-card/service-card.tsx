import Link from 'next/link';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Service, User } from '@/payload-types';

import { ServiceCardImage } from './service-card-image';
import { ServiceCardPricing } from './service-card-pricing';
import { ServiceCardProvider } from './service-card-provider';
import { ServiceCardStats } from './service-card-stats';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const provider = service.provider as User;

  return (
    <Link href={`/services/${service.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <ServiceCardImage service={service} />
        <CardHeader>
          <CardTitle>{service.title}</CardTitle>
          <ServiceCardProvider provider={provider} />
        </CardHeader>
        <CardContent>
          <ServiceCardStats service={service} />
          <ServiceCardPricing service={service} />
        </CardContent>
      </Card>
    </Link>
  );
}
