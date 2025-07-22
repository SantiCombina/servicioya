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
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('servicioya-theme') === 'dark' || (!localStorage.getItem('servicioya-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
