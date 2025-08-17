import { Service, Category, Location, User } from '@/payload-types';

// Tipo para servicios con relaciones pobladas
export interface ExtendedService extends Service {
  category: Category;
  location: Location;
  provider: User;
}

// Helper para verificar si un service tiene las relaciones pobladas
export function isServicePopulated(service: Service): service is ExtendedService {
  return (
    typeof service.category === 'object' && typeof service.location === 'object' && typeof service.provider === 'object'
  );
}
