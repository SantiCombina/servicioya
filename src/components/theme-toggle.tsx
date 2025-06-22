'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/lib/hooks/use-mounted';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const getIcon = () => {
    if (!mounted) {
      return <div className="w-5 h-5 rounded-full bg-current opacity-30 animate-pulse" />;
    }

    const currentTheme = resolvedTheme || theme;
    return currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
  };
  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={!mounted}
      className={`transition-all duration-300 ease-in-out ${
        !mounted ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
