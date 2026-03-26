import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface InactiveServiceMessageProps {
  className?: string;
}

export function InactiveServiceMessage({ className }: InactiveServiceMessageProps) {
  return (
    <div className={`min-h-main ${className ?? ''}`}>
      <div className="container py-20">
        <div className="max-w-lg mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Servicio no disponible</AlertTitle>
            <AlertDescription>
              Este servicio se encuentra inactivo y no está disponible para contratación en este momento.
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/services">Ver otros servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
