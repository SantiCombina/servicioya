'use client';

import { Navbar } from '@/components/ui';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from './theme-provider';

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/login', '/signup', '/admin'];
  const shouldHideNavbar = hideNavbarRoutes.some((route) => pathname.startsWith(route));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="servicioya-theme"
    >
      {!shouldHideNavbar && <Navbar />}
      {children}
    </ThemeProvider>
  );
}
