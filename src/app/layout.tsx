import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/styles/globals.css';
import ClientLayoutShell from './client-layout-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ServicioYa',
  description:
    'Conectamos a quienes ofrecen servicios con quienes los necesitan. Encuentra plomeros, electricistas, modistas y más en tu zona.',
  keywords: ['servicios', 'plomería', 'electricista', 'modista', 'contratación', 'marketplace'],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'ServicioYa - Marketplace de Servicios',
    description: 'Conectamos a quienes ofrecen servicios con quienes los necesitan',
    siteName: 'ServicioYa',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <ClientLayoutShell>{children}</ClientLayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
