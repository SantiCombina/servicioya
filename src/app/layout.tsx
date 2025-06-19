import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServicioYa",
  description: "Conectamos a quienes ofrecen servicios con quienes los necesitan. Encuentra plomeros, electricistas, modistas y más en tu zona.",
  keywords: ["servicios", "plomería", "electricista", "modista", "contratación", "marketplace"],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "ServicioYa - Marketplace de Servicios",
    description: "Conectamos a quienes ofrecen servicios con quienes los necesitan",
    siteName: "ServicioYa"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {!String(global?.window?.location?.pathname || '').includes('/admin') && (
            <div className="fixed z-50 top-4 right-4">
              <ThemeToggle />
            </div>
          )}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
