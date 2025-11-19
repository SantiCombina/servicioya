'use client';

import { motion } from 'framer-motion';

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
      <motion.div
        className="hidden sm:flex sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
          <p className="text-gray-600">{servicesCount} servicios encontrados</p>
        </motion.div>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
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
        </motion.div>
      </motion.div>

      <motion.div
        className="sm:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
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
      </motion.div>
    </div>
  );
}
