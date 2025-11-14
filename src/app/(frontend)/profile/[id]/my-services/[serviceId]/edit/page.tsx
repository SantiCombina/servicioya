import { redirect } from 'next/navigation';

import { getCategories } from '@/app/services/category';
import { getLocations } from '@/app/services/location';
import { getServiceById } from '@/app/services/service';
import { EditServiceForm } from '@/components/profile/[id]/my-services/[serviceId]/edit/edit-service-form';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';

export default async function EditServicePage({ params }: { params: Promise<{ id: string; serviceId: string }> }) {
  const { id, serviceId } = await params;

  const [currentUserResult, service, categories, locations] = await Promise.all([
    getCurrentUserAction({}),
    getServiceById(serviceId),
    getCategories(),
    getLocations(),
  ]);

  const currentUser = currentUserResult.data?.user || null;

  if (!currentUser) {
    const currentPath = `/profile/${id}/my-services/${serviceId}/edit`;
    redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
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

  const providerId = typeof service.provider === 'object' ? service.provider.id : service.provider;
  const canEdit = currentUser && (currentUser.id.toString() === providerId.toString() || currentUser.role === 'admin');

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
