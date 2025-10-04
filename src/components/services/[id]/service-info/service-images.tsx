import { Media, Service } from '@/payload-types';

import { ServiceImageGallery } from './service-image-gallery';

interface ServiceImagesProps {
  service: Service;
}

export function ServiceImages({ service }: ServiceImagesProps) {
  const images: string[] = [];

  if (service.image && typeof service.image === 'object') {
    const media = service.image as Media;
    if (media.url) {
      images.push(media.url);
    }
  }

  if (service.photos) {
    service.photos.forEach((photo) => {
      if (typeof photo === 'object') {
        const media = photo as Media;
        if (media.url) {
          images.push(media.url);
        }
      }
    });
  }

  return <ServiceImageGallery images={images} title={service.title} />;
}
