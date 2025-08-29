'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { MyServicesList } from '@/components/profile/[id]/my-service/my-services-list';

export default function MyServicesPage() {
  const params = useParams();
  const profileId = params.id as string;

  return (
    <div className="min-h-main">
      <main className="container py-6">
        {/* Botones de Navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <Link href={`/profile/${profileId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Volver al Perfil</h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/profile/${profileId}/my-services/new`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Nuevo Servicio</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <MyServicesList />
      </main>
    </div>
  );
}
