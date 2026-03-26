'use client';

import Link from 'next/link';

import { Card } from '@/components/ui/card';
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
    <Link href={`/services/${service.id}`} className="block group h-full">
      <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full flex flex-col">
        <ServiceCardImage service={service} />
        <div className="flex flex-col flex-1 p-4 gap-3">
          <div className="flex-1">
            <h4 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground mb-1">{service.title}</h4>
            <ServiceCardProvider provider={provider} />
          </div>
          <div>
            <ServiceCardStats service={service} />
            <ServiceCardPricing service={service} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
