import { AlertTriangle } from 'lucide-react';

interface InactiveServiceMessageProps {
  className?: string;
}

export function InactiveServiceMessage({ className }: InactiveServiceMessageProps) {
  return (
    <div className={`min-h-main ${className || ''}`}>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-xl border border-yellow-200 p-12">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="h-12 w-12 text-orange-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Servicio no disponible</h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Este servicio actualmente se encuentra inactivo y no está disponible para contratación.
            </p>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <p className="text-orange-800 font-medium">
                💡 El proveedor de este servicio podrá reactivarlo cuando esté disponible nuevamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
