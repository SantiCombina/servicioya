'use client';

import { useState, useEffect } from 'react';
import { FiltersSidebar } from '@/components/services/filters-sidebar';
import { ServiceCard } from '@/components/services/service-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { normalize } from '@/lib/helpers/normalize';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function ServicesInteractive({ initialServices }: { initialServices: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [services] = useState<any[]>(initialServices);

  const searchParams = useSearchParams();

  // Extraer categorías y ubicaciones únicas de los servicios
  const categories = Array.from(new Set(services.map((s) => s.category?.name).filter(Boolean)));
  const locations = Array.from(new Set(services.map((s) => s.location?.name).filter(Boolean)));

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  }, [searchParams]);

  const filteredServices = services
    .filter((service) => {
      // Búsqueda
      let matchesSearch = true;
      if (searchTerm.trim() !== '') {
        const term = normalize(searchTerm);
        const keywords = term.split(/\s+/).filter(Boolean);
        const fields = [
          normalize(service.title),
          normalize(service.provider?.name),
          normalize(service.category?.name),
          normalize(service.description),
        ];
        matchesSearch = keywords.some((kw) => fields.some((field) => field && field.includes(kw)));
      }
      // Categoría
      let matchesCategory = true;
      if (selectedCategory.length > 0) {
        matchesCategory = selectedCategory.some((cat) => normalize(service.category?.name) === normalize(cat));
      }
      // Ubicación
      let matchesLocation = true;
      if (selectedLocation.length > 0) {
        matchesLocation = selectedLocation.some((loc) => normalize(service.location?.name) === normalize(loc));
      }
      // Precio
      const matchesPrice = service.priceFrom >= priceRange[0] && service.priceFrom <= priceRange[1];
      // Verificado
      const matchesVerified = !showVerifiedOnly || service.verified;
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesVerified;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return (a.priceFrom || 0) - (b.priceFrom || 0);
        case 'price-high':
          return (b.priceFrom || 0) - (a.priceFrom || 0);
        case 'jobs':
          return (b.completedJobs || 0) - (a.completedJobs || 0);
        case 'reviews':
          return (b.reviews?.length || 0) - (a.reviews?.length || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-main">
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FiltersSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
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
                <p className="text-gray-600">{filteredServices.length} servicios encontrados</p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
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
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => (
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
