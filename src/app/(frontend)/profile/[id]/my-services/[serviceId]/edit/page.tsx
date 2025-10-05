import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getCategories } from '@/app/services/category';
import { getLocations } from '@/app/services/location';
import { getServiceById } from '@/app/services/service';
import { getCurrentUser } from '@/app/services/user';
import { EditServiceForm } from '@/components/profile/[id]/my-services/[serviceId]/edit/edit-service-form';

export default async function EditServicePage({ params }: { params: Promise<{ id: string; serviceId: string }> }) {
  const { id, serviceId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value || null;

  const [currentUser, service, categories, locations] = await Promise.all([
    getCurrentUser(token),
    getServiceById(serviceId),
    getCategories(),
    getLocations(),
  ]);

  if (!currentUser) {
    redirect('/login');
  }

  if (!service) {
    return (
      <div className="min-h-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Servicio no encontrado</h1>
          <p className="text-muted-foreground">El servicio que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  // Verificar que el usuario puede editar este servicio
  const canEdit =
    currentUser.id === service.provider ||
    (typeof service.provider === 'object' && currentUser.id === service.provider.id) ||
    currentUser.role === 'admin';

  if (!canEdit) {
    redirect(`/profile/${id}/my-services`);
  }

  return (
    <div className="min-h-main">
      <main className="container py-12">
        <EditServiceForm service={service} categories={categories} locations={locations} profileId={id} />
      </main>
    </div>
  );
}
