import { AlertTriangle } from 'lucide-react';

interface OwnerInactiveBannerProps {
  className?: string;
}

export function OwnerInactiveBanner({ className }: OwnerInactiveBannerProps) {
  return (
    <div
      className={`bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 mb-6 shadow-sm ${className || ''}`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-yellow-900 font-semibold text-lg">Tu servicio está inactivo</h3>
          <p className="text-yellow-800">Este servicio no aparece en las búsquedas públicas. Solo tú puedes verlo.</p>
          <p className="text-yellow-700 text-sm">
            Puedes activarlo desde la sección &ldquo;Mis Servicios&rdquo; en tu perfil.
          </p>
        </div>
      </div>
    </div>
  );
}
