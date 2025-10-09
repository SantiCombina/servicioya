'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';

import { MyServicesList } from '@/components/profile/[id]/my-services/my-services-list';
import { Button } from '@/components/ui/button';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';
import { User } from '@/payload-types';

export default function MyServicesPage() {
  const params = useParams();
  const profileId = params.id as string;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { execute: loadCurrentUser, result: userResult } = useAction(getCurrentUserAction);

  useEffect(() => {
    loadCurrentUser({});
  }, []);

  useEffect(() => {
    if (userResult.data?.user) {
      setCurrentUser(userResult.data.user);
    }
  }, [userResult]);

  const canCreateService = currentUser && (currentUser.id.toString() === profileId || currentUser.role === 'admin');

  return (
    <div className="min-h-main">
      <main className="container py-12 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mis Servicios</h1>
            <p className="text-muted-foreground">Gestiona todos tus servicios publicados</p>
          </div>

          {canCreateService && (
            <Button asChild size="lg" className="shadow-lg">
              <Link href={`/profile/${profileId}/my-services/new`}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Servicio
              </Link>
            </Button>
          )}
        </div>

        <MyServicesList />
      </main>
    </div>
  );
}
