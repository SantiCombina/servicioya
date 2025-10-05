import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { SortOption } from '../../../lib/hooks/use-search-params';

interface ServicesHeaderProps {
  servicesCount: number;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  children?: React.ReactNode;
}

export function ServicesHeader({ servicesCount, sortBy, setSortBy, children }: ServicesHeaderProps) {
  return (
    <div className="mb-6">
      <div className="hidden sm:flex sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
          <p className="text-gray-600">{servicesCount} servicios encontrados</p>
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
          {children}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
          <p className="text-gray-600">{servicesCount} servicios encontrados</p>
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
          {children}
        </div>
      </div>
    </div>
  );
}
