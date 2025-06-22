import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

function SearchInput() {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input type="search" placeholder="Buscar servicios..." className="pl-10" />
    </div>
  );
}

export { SearchInput };
