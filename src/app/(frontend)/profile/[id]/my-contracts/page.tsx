'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { MyContractsList } from '@/components/profile/[id]/my-contracts/my-contracts-list';
import { Card, CardContent } from '@/components/ui';

export default function MyContractsPage() {
  const params = useParams();
  const profileId = params.id as string;

  return (
    <div className="min-h-main">
      <main className="container py-6">
        {/* Botón de Navegación */}
        <div className="mb-6">
          <Link href={`/profile/${profileId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-border inline-block">
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
        </div>

        <MyContractsList />
      </main>
    </div>
  );
}
