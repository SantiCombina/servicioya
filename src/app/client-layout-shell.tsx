'use client';

import { ThemeProvider } from '@/components/navbar/theme-provider';
import { Navbar } from '@/components/navbar/navbar';
import { usePathname } from 'next/navigation';

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
