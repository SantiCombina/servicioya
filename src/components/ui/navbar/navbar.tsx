import Image from 'next/image';
import Link from 'next/link';

import { SearchInput } from './search-input';
import { ThemeToggle } from './theme-toggle';
import { UserTrigger } from './user-trigger';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/icon.png" alt="ServicioYa" width={32} height={32} className="h-8 w-8" />
          <span className="font-bold text-xl text-foreground hidden sm:flex">ServicioYa</span>
        </Link>

        <SearchInput />

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <UserTrigger />
        </div>
      </div>
    </nav>
  );
}
