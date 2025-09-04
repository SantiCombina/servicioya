'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { FiltersSidebar } from '@/components/services/filters-sidebar';
import { ServiceCard } from '@/components/services/service-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { normalize } from '@/lib/helpers/normalize';
import { Category, Location, Service, User } from '@/payload-types';

type SortOption = 'rating' | 'price-low' | 'price-high' | 'jobs' | 'reviews';

export function ServicesInteractive({ initialServices }: { initialServices: Service[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [services] = useState<Service[]>(initialServices);

  const searchParams = useSearchParams();

  // Extraer categorías y ubicaciones únicas de los servicios
  const categories = useMemo(() => Array.from(new Set(services.map((s) => (s.category as Category).name))), [services]);

  const locations = useMemo(() => Array.from(new Set(services.map((s) => (s.location as Location).name))), [services]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  }, [searchParams]);

  // Función de filtrado simplificada
  const filterServices = useCallback(
    (services: Service[]): Service[] => {
      return services.filter((service) => {
        const provider = service.provider as User;
        const category = service.category as Category;
        const location = service.location as Location;

        // Búsqueda por texto
        let matchesSearch = true;
        if (searchTerm.trim() !== '') {
          const term = normalize(searchTerm);
          const keywords = term.split(/\s+/).filter(Boolean);
          const searchableFields = [
            normalize(service.title || ''),
            normalize(provider.name || ''),
            normalize(category.name || ''),
            normalize(service.description || ''),
          ];

          matchesSearch = keywords.some((keyword) => searchableFields.some((field) => field.includes(keyword)));
        }

        // Filtro por categoría
        const matchesCategory =
          selectedCategory.length === 0 || selectedCategory.some((cat) => normalize(category.name) === normalize(cat));

        // Filtro por ubicación
        const matchesLocation =
          selectedLocation.length === 0 || selectedLocation.some((loc) => normalize(location.name) === normalize(loc));

        // Filtro por precio
        const matchesPrice = service.priceFrom >= priceRange[0] && service.priceFrom <= priceRange[1];

        // Filtro por verificación
        const matchesVerified = !showVerifiedOnly || Boolean(service.verified);

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesVerified;
      });
    },
    [searchTerm, selectedCategory, selectedLocation, priceRange, showVerifiedOnly],
  );

  // Función de ordenamiento mejorada
  const sortServices = useCallback((services: Service[], sortBy: SortOption): Service[] => {
    return [...services].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return a.priceFrom - b.priceFrom;
        case 'price-high':
          return b.priceFrom - a.priceFrom;
        case 'jobs':
          return (b.completedJobs || 0) - (a.completedJobs || 0);
        case 'reviews':
          return (Array.isArray(b.reviews) ? b.reviews.length : 0) - (Array.isArray(a.reviews) ? a.reviews.length : 0);
        default:
          return 0;
      }
    });
  }, []);

  // Servicios filtrados y ordenados
  const processedServices = useMemo(() => {
    const filtered = filterServices(services);
    return sortServices(filtered, sortBy);
  }, [services, filterServices, sortServices, sortBy]);

  return (
    <div className="min-h-main">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FiltersSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              priceRange={priceRange}
              setPriceRange={(value: number[]) => setPriceRange([value[0], value[1]])}
              showVerifiedOnly={showVerifiedOnly}
              setShowVerifiedOnly={setShowVerifiedOnly}
              categories={categories}
              locations={locations}
            />
          </div>

          <div className="lg:col-span-3">
            {/* Header with sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
                <p className="text-gray-600">{processedServices.length} servicios encontrados</p>
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="jobs">Más trabajos realizados</SelectItem>
                  <SelectItem value="reviews">Más reseñas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Services Grid */}
            {processedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processedServices.map((service: Service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron servicios</h3>
                <p className="text-gray-600">Intenta ajustar los filtros o buscar con otros términos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
