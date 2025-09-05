'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';

import { FiltersDrawer } from '@/components/services/filters-drawer';
import { FiltersSidebar } from '@/components/services/filters-sidebar';
import { ServiceCard } from '@/components/services/service-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { normalize } from '@/lib/helpers/normalize';
import { Category, Location, Service, User } from '@/payload-types';

type SortOption = 'rating' | 'price-low' | 'price-high' | 'jobs';

export function ServicesInteractive({ initialServices }: { initialServices: Service[] }) {
  const searchParams = useSearchParams();

  // Inicializar estados desde URL params
  const [searchTerm] = useState(() => searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
    const categories = searchParams.get('category');
    return categories ? categories.split(',') : [];
  });
  const [selectedLocation, setSelectedLocation] = useState<string[]>(() => {
    const locations = searchParams.get('location');
    return locations ? locations.split(',') : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const priceFrom = searchParams.get('priceFrom');
    const priceTo = searchParams.get('priceTo');
    return [priceFrom ? parseInt(priceFrom, 10) : 0, priceTo ? parseInt(priceTo, 10) : 10000];
  });
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(() => {
    return searchParams.get('verified') === '1';
  });
  const [services] = useState<Service[]>(initialServices);

  // Extraer categorías y ubicaciones únicas de los servicios
  const categories = useMemo(() => Array.from(new Set(services.map((s) => (s.category as Category).name))), [services]);

  const locations = useMemo(() => Array.from(new Set(services.map((s) => (s.location as Location).name))), [services]);

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
          {/* Filters Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
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

          <div className="col-span-1 lg:col-span-3">
            {/* Header with sort and mobile filters */}
            <div className="mb-6">
              <div className="hidden sm:flex sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
                  <p className="text-gray-600">{processedServices.length} servicios encontrados</p>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Más calificación</SelectItem>
                      <SelectItem value="price-low">Menor precio</SelectItem>
                      <SelectItem value="price-high">Mayor precio</SelectItem>
                      <SelectItem value="jobs">Más trabajos realizados</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Botón filtros solo en tablet/desktop */}
                  <div className="lg:hidden">
                    <FiltersDrawer
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
                      resultsCount={processedServices.length}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile pequeño: Header arriba, controles debajo */}
              <div className="sm:hidden">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
                  <p className="text-gray-600">{processedServices.length} servicios encontrados</p>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Más calificación</SelectItem>
                      <SelectItem value="price-low">Menor precio</SelectItem>
                      <SelectItem value="price-high">Mayor precio</SelectItem>
                      <SelectItem value="jobs">Más trabajos realizados</SelectItem>
                    </SelectContent>
                  </Select>

                  <FiltersDrawer
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
                    resultsCount={processedServices.length}
                  />
                </div>
              </div>
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
