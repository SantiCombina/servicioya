'use client';

import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = resolvedTheme || theme;

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} className="transition-all duration-300 ease-in-out">
      {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
