'use client';

import { NewServiceForm } from '@/components/profile/[id]/my-service/new/new-service-form';
import { Card, CardContent } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NewServicePage() {
  const params = useParams();
  const profileId = params.id as string;

  return (
    <div className="min-h-main">
      <main className="container py-6">
        {/* Botón de Navegación */}
        <div className="mb-6">
          <Link href={`/profile/${profileId}/my-services`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border inline-block">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Volver a Mis Servicios</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <NewServiceForm />
      </main>
    </div>
  );
}
