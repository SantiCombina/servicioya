'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function SearchInput() {
  const [value, setValue] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/services')) {
      setValue('');
    }
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/services?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Buscar servicios..."
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export { SearchInput };
