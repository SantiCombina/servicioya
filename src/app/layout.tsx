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
  metadataBase: new URL('https://servicioya.vercel.app'),
  title: {
    default: 'ServicioYa — Marketplace de Servicios',
    template: '%s | ServicioYa',
  },
  description:
    'Conectamos a quienes ofrecen servicios con quienes los necesitan. Encontrá plomeros, electricistas, modistas y más cerca tuyo.',
  keywords: [
    'servicios',
    'plomería',
    'electricista',
    'modista',
    'carpintería',
    'jardinería',
    'contratación',
    'marketplace',
    'Argentina',
    'profesionales',
  ],
  icons: {
    icon: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'ServicioYa — Marketplace de Servicios',
    description: 'Conectamos a quienes ofrecen servicios con quienes los necesitan.',
    siteName: 'ServicioYa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServicioYa — Marketplace de Servicios',
    description: 'Conectamos a quienes ofrecen servicios con quienes los necesitan.',
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
