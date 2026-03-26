import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
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
    <div className="relative overflow-hidden h-52">
      <Image
        src={imageUrl}
        alt={service.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-2 left-2 flex gap-1.5">
        <Badge className="bg-primary text-primary-foreground shadow-sm">{category.name}</Badge>
        {service.verified && <Badge className="bg-emerald-500 text-white shadow-sm">Verificado</Badge>}
      </div>
    </div>
  );
}
