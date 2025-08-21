import { User, Media, Category, Location } from '@/payload-types';

export const getUserName = (user: User | number): string => {
  if (typeof user === 'object') {
    return user.name || user.email || 'Usuario';
  }
  return 'Usuario';
};

export const getAvatarUrl = (user: User | number): string => {
  if (typeof user === 'object' && user.avatar && typeof user.avatar === 'object' && user.avatar.url) {
    return user.avatar.url;
  }
  return '/placeholder.svg';
};

export const getImageUrls = (image?: (number | null) | Media, photos?: (number | Media)[] | null): string[] => {
  const images: string[] = [];

  if (image && typeof image === 'object' && image.url) {
    images.push(image.url);
  }

  if (photos && Array.isArray(photos)) {
    photos.forEach((photo) => {
      if (typeof photo === 'object' && photo.url) {
        images.push(photo.url);
      }
    });
  }

  return images.length > 0 ? images : ['/placeholder.svg'];
};

export const getCategoryName = (category: number | Category): string => {
  return typeof category === 'object' ? category.name : 'Categoría';
};

export const getLocationName = (location: number | Location): string => {
  return typeof location === 'object' ? location.name : 'Ubicación';
};
