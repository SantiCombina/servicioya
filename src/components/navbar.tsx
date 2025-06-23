import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { SearchInput } from './ui/search-input';
import { UserAvatar } from './user-avatar';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SY</span>
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:flex">ServicioYa</span>
        </Link>

        <SearchInput />

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}
