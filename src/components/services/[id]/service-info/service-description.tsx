import { Clock } from 'lucide-react';

import { CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { Service } from '@/payload-types';

interface ServiceDescriptionProps {
  service: Service;
}

export function ServiceDescription({ service }: ServiceDescriptionProps) {
  return (
    <CardContent>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4 min-h-[96px]">
          <p className="text-foreground leading-relaxed">{service.description}</p>
        </TabsContent>
        <TabsContent value="availability" className="mt-4 min-h-[96px]">
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>{service.availability || 'Disponibilidad a consultar'}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  );
}
