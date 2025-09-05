import { Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import { Service, User, Category, Location } from '@/payload-types';

interface Props {
  service: Service;
}

export function ServiceCard({ service }: Props) {
  const router = useRouter();

  const handleProviderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${provider.id}`);
  };

  const getImageUrl = (): string => {
    if (service.image && typeof service.image === 'object' && service.image.url) {
      return service.image.url;
    }

    if (service.photos && Array.isArray(service.photos) && service.photos.length > 0) {
      const firstPhoto = service.photos[0];
      if (typeof firstPhoto === 'object' && firstPhoto.url) {
        return firstPhoto.url;
      }
    }

    return '/placeholder.svg';
  };

  const getReviewsCount = (): number => {
    if (!service.reviews) return 0;
    return Array.isArray(service.reviews) ? service.reviews.length : 0;
  };

  const provider = service.provider as User;
  const category = service.category as Category;
  const location = service.location as Location;

  return (
    <Link href={`/services/${service.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative">
          <Image
            src={getImageUrl()}
            alt={service.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-blue-600">{category.name}</Badge>
            {service.verified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Verificado
              </Badge>
            )}
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg mb-0">{service.title}</CardTitle>
          <CardDescription>
            por{' '}
            <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={handleProviderClick}>
              {provider.name || provider.email}
            </span>
          </CardDescription>
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
              <span className="text-sm">{location.name}</span>
            </div>

            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{service.availability || 'Consultar horarios'}</span>
            </div>

            <div className="flex justify-end items-center pt-2">
              <span className="text-lg font-bold text-green-600">Desde ${service.priceFrom.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
