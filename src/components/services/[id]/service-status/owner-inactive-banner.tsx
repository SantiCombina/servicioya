import { AlertTriangle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface OwnerInactiveBannerProps {
  className?: string;
}

export function OwnerInactiveBanner({ className }: OwnerInactiveBannerProps) {
  return (
    <Alert
      className={`border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 mb-4 ${className ?? ''}`}
    >
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-800 dark:text-amber-200">Tu servicio está inactivo</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        Este servicio no aparece en búsquedas públicas. Solo vos podés verlo. Podés activarlo desde &ldquo;Mis
        Servicios&rdquo; en tu perfil.
      </AlertDescription>
    </Alert>
  );
}
