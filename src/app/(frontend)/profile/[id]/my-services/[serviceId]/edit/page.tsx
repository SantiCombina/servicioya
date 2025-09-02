'use client';

import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function EditServicePage() {
  const params = useParams();
  const profileId = params.id as string;
  const serviceId = params.serviceId as string;

  return (
    <div className="min-h-main">
      <main className="container py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href={`/profile/${profileId}/my-services`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Mis Servicios
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Editar Servicio</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Edición en desarrollo</h3>
              <p className="text-muted-foreground mb-4">Próximamente podrás editar servicios desde aquí.</p>
              <p className="text-sm text-muted-foreground">ID del servicio: {serviceId}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
