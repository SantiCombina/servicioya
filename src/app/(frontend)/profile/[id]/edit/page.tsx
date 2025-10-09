import { redirect } from 'next/navigation';

import { getLocations } from '@/app/services/location';
import { getUserById } from '@/app/services/user';
import { EditProfileForm } from '@/components/profile/[id]/edit/edit-profile-form';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [currentUserResult, userToEdit, locations] = await Promise.all([
    getCurrentUserAction({}),
    getUserById(id),
    getLocations(),
  ]);

  const currentUser = currentUserResult.data?.user || null;

  if (!currentUser) {
    redirect('/login');
  }

  if (!userToEdit) {
    return (
      <div className="min-h-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Usuario no encontrado</h1>
          <p className="text-muted-foreground">El usuario que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  if (!currentUser || (currentUser.id.toString() !== id && currentUser.role !== 'admin')) {
    redirect(`/profile/${id}`);
  }

  return (
    <div className="min-h-main">
      <main className="container py-12">
        <EditProfileForm user={userToEdit} locations={locations} />
      </main>
    </div>
  );
}
