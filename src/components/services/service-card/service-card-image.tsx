import Image from 'next/image';

import { Badge } from '@/components/ui';
import { Service, Category } from '@/payload-types';

function getServiceImageUrl(service: Service): string {
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
}

interface ServiceCardImageProps {
  service: Service;
}

export function ServiceCardImage({ service }: ServiceCardImageProps) {
  const category = service.category as Category;
  const imageUrl = getServiceImageUrl(service);

  return (
    <div className="relative">
      <Image src={imageUrl} alt={service.title} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="absolute top-2 left-2 flex gap-2">
        <Badge className="bg-blue-600">{category.name}</Badge>
        {service.verified && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verificado
          </Badge>
        )}
      </div>
    </div>
  );
}
