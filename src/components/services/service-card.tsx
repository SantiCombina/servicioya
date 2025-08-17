import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui';
import { Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: string | number;
  title?: string;
  provider?: { name?: string };
  rating?: number;
  reviews?: any[];
  completedJobs?: number;
  priceFrom?: number;
  location?: { name?: string; province?: string };
  category?: { name?: string };
  description?: string;
  availability?: string;
  image?: { url?: string };
  verified?: boolean;
}

interface Props {
  service: Service;
}

export function ServiceCard({ service }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={service.image?.url || '/placeholder.svg'}
          alt={service.title || 'Servicio'}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {service.category?.name && <Badge className="bg-blue-600">{service.category.name}</Badge>}
          {service.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verificado
            </Badge>
          )}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg mb-0">{service.title || 'Sin título'}</CardTitle>
        <CardDescription>por {service.provider?.name || 'Sin proveedor'}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{service.description || 'Sin descripción'}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{service.rating ?? '-'}</span>
              <span className="text-gray-500">({service.reviews?.length ?? 0})</span>
            </div>
            <span className="text-sm text-gray-500">{service.completedJobs ?? 0} trabajos</span>
          </div>

          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {service.location?.name && service.location?.province
                ? `${service.location.name}, ${service.location.province}`
                : service.location?.name || 'Sin ubicación'}
            </span>
          </div>

          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{service.availability || 'Sin horario'}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-green-600">
              Desde ${service.priceFrom?.toLocaleString() ?? '-'}
            </span>
            <Button size="sm" asChild>
              <Link href={`/service/${service.id}`}>Ver Detalles</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
