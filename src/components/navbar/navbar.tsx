import { ThemeToggle } from '@/components/navbar/theme-toggle';
import { SearchInput } from './search-input';
import { Logo } from './logo';
import { UserAvatar } from './user-avatar';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 justify-between items-center">
        <Logo />

        <SearchInput />

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}
