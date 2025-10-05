import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyServicesStateProps {
  profileId: string;
}

export function EmptyServicesState({ profileId }: EmptyServicesStateProps) {
  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground mb-2">No tienes servicios aún</h3>
          <p className="text-muted-foreground mb-4">Comienza creando tu primer servicio para ofrecer a la comunidad.</p>
          <Button asChild variant="secondary">
            <Link href={`/profile/${profileId}/my-services/new`}>
              <Plus className="h-4 w-4 mr-2" />
              Crear mi primer servicio
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
