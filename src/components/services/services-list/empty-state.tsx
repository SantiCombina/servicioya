import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClear?: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="p-5 rounded-full bg-muted mb-5">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No se encontraron servicios</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        No hay resultados para tu búsqueda. Intentá ajustar los filtros o explorar otras categorías.
      </p>
      {onClear && (
        <Button variant="outline" onClick={onClear}>
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
