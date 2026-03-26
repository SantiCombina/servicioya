import { Briefcase, FileText } from 'lucide-react';
import type { Metadata } from 'next';

import { getUserById, getUserServicesCount, getUserBookingsCount } from '@/app/services/user';
import { ProfileHeader } from '@/components/profile/[id]/profile-header';
import { ProfileSectionCard } from '@/components/profile/[id]/profile-section-card';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return { title: 'Perfil no encontrado | ServicioYa' };
  }

  return {
    title: `${user.name} — Perfil | ServicioYa`,
    description: `Conocé el perfil de ${user.name} en ServicioYa. Servicios profesionales verificados.`,
    openGraph: {
      title: `${user.name} — Perfil | ServicioYa`,
      description: `Conocé el perfil de ${user.name} en ServicioYa.`,
      type: 'profile',
      locale: 'es_ES',
    },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [user, servicesCount, bookingsCount, userResult] = await Promise.all([
    getUserById(id),
    getUserServicesCount(id),
    getUserBookingsCount(id),
    getCurrentUserAction({}),
  ]);

  const currentUser = userResult.data?.user || null;

  if (!user) {
    return (
      <div className="min-h-main flex items-center justify-center">
        <span className="text-lg text-muted-foreground">Usuario no encontrado</span>
      </div>
    );
  }

  return (
    <div className="min-h-main">
      <main className="container py-12">
        <ProfileHeader user={user} currentUser={currentUser} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProfileSectionCard
            href={`/profile/${id}/my-services`}
            icon={<Briefcase size={28} strokeWidth={2.2} className="text-primary" />}
            bgColor="bg-primary/10"
            title="Mis Servicios"
            description="Gestiona y publica los servicios que ofreces"
            count={servicesCount}
          />
          <ProfileSectionCard
            href={`/profile/${id}/my-contracts`}
            icon={<FileText size={28} strokeWidth={2.2} className="text-emerald-600 dark:text-emerald-400" />}
            bgColor="bg-emerald-100 dark:bg-emerald-950/30"
            title="Mis Contratos"
            description="Revisa los contratos que has realizado"
            count={bookingsCount}
          />
        </div>
      </main>
    </div>
  );
}
