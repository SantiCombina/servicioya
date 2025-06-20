'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/lib/hooks/use-mounted';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  if (!mounted) {
    return (
      <div className="fixed z-50 top-4 right-4">
        <Button variant="ghost" size="icon" disabled>
          <Sun className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed z-50 top-4 right-4">
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
