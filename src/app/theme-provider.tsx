'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: { children: React.ReactNode; [prop: string]: any }) {
  return (
    <NextThemesProvider {...props} storageKey="servicioya-theme" enableColorScheme={false}>
      {children}
    </NextThemesProvider>
  );
}
