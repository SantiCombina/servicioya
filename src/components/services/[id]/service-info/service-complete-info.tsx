import { Briefcase, Clock, MapPin } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Location as LocationType, Service } from '@/payload-types';

interface ServiceCompleteInfoProps {
  service: Service;
  location: LocationType;
  serviceCompletedJobs: number;
}

export function ServiceCompleteInfo({ service, location, serviceCompletedJobs }: ServiceCompleteInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location.name}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Desde</div>
            <div className="text-3xl font-bold text-green-600">${service.priceFrom.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">por servicio</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Descripción</h3>
          <p className="text-muted-foreground leading-relaxed">{service.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {service.availability && (
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-sm">Disponibilidad</div>
                <div className="text-sm text-muted-foreground">{service.availability}</div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Briefcase className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-sm">Trabajos realizados</div>
              <div className="text-sm text-muted-foreground">{serviceCompletedJobs} contrataciones</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
