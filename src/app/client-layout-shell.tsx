'use client';

import { usePathname } from 'next/navigation';

import { Navbar, Toaster } from '@/components/ui';
import { Footer } from '@/components/ui/footer/footer';

import { ThemeProvider } from './theme-provider';

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideRoutes = ['/login', '/signup', '/admin'];
  const shouldHide = hideRoutes.some((route) => pathname.startsWith(route));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="servicioya-theme"
    >
      {!shouldHide && <Navbar />}
      {children}
      {!shouldHide && <Footer />}
      <Toaster />
    </ThemeProvider>
  );
}
