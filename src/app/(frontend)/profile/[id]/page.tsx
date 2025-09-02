import { Briefcase, FileText } from 'lucide-react';

import { getUserById, getUserServicesCount, getUserBookingsCount } from '@/app/services/user';
import { ProfileHeader } from '@/components/profile/[id]/profile-header';
import { ProfileSectionCard } from '@/components/profile/[id]/profile-section-card';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [user, servicesCount, bookingsCount] = await Promise.all([
    getUserById(id),
    getUserServicesCount(id),
    getUserBookingsCount(id),
  ]);

  if (!user) {
    return (
      <div className="min-h-main flex items-center justify-center">
        <span className="text-lg text-gray-500">Usuario no encontrado</span>
      </div>
    );
  }

  return (
    <div className="min-h-main">
      <main className="container py-6">
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProfileSectionCard
            href={`/profile/${id}/my-services`}
            icon={<Briefcase size={28} strokeWidth={2.2} className="text-blue-600" />}
            bgColor="bg-blue-100"
            title="Mis Servicios"
            description="Gestiona y publica los servicios que ofreces"
            count={servicesCount}
          />
          <ProfileSectionCard
            href={`/profile/${id}/my-contracts`}
            icon={<FileText size={28} strokeWidth={2.2} className="text-green-600" />}
            bgColor="bg-green-100"
            title="Mis Contratos"
            description="Revisa los contratos que has realizado"
            count={bookingsCount}
          />
        </div>
      </main>
    </div>
  );
}
