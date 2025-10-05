import { MapPin } from 'lucide-react';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Location, Service } from '@/payload-types';

interface ServiceHeaderProps {
  service: Service;
  location: Location;
}

export function ServiceHeader({ service, location }: ServiceHeaderProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
          <CardDescription className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {location.name}
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            Desde ${service.priceFrom?.toLocaleString() || 'Consultar'}
          </div>
          <div className="text-sm text-muted-foreground">por servicio</div>
        </div>
      </div>
    </CardHeader>
  );
}
