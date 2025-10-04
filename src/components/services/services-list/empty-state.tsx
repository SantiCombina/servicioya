import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Search className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No se encontraron servicios</h3>
      <p className="text-gray-600">Intenta ajustar los filtros o buscar con otros términos</p>
    </div>
  );
}
