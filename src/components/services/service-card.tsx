import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@/components/ui';
import { Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/payload-types';
import { getUserName, getImageUrls, getCategoryName, getLocationName } from '@/lib/helpers/service-helpers';

interface Props {
  service: Service;
}

export function ServiceCard({ service }: Props) {
  // Helper para obtener la URL de la imagen optimizada
  const getImageUrl = (): string => {
    const images = getImageUrls(service.image, service.photos);
    return images.length > 0 ? images[0] : '/placeholder.svg';
  };

  // Helper para contar reviews
  const getReviewsCount = (): number => {
    if (!service.reviews) return 0;
    return Array.isArray(service.reviews) ? service.reviews.length : 0;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image src={getImageUrl()} alt={service.title} width={300} height={200} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-blue-600">{getCategoryName(service.category)}</Badge>
          {service.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verificado
            </Badge>
          )}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg mb-0">{service.title}</CardTitle>
        <CardDescription>por {getUserName(service.provider)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{service.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{service.rating ?? '-'}</span>
              <span className="text-gray-500">({getReviewsCount()})</span>
            </div>
            <span className="text-sm text-gray-500">{service.completedJobs ?? 0} trabajos</span>
          </div>

          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{getLocationName(service.location)}</span>
          </div>

          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{service.availability || 'Consultar horarios'}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-green-600">Desde ${service.priceFrom.toLocaleString()}</span>
            <Button size="sm" asChild>
              <Link href={`/services/${service.id}`}>Ver Detalles</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
