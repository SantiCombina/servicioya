import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getLocations } from '@/app/services/location';
import { getCurrentUser, getUserById } from '@/app/services/user';
import { EditProfileForm } from '@/components/profile/[id]/edit/edit-profile-form';

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value || null;

  const [currentUser, userToEdit, locations] = await Promise.all([
    getCurrentUser(token),
    getUserById(id),
    getLocations(),
  ]);

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

  const canEdit = currentUser.id === userToEdit.id || currentUser.role === 'admin';

  if (!canEdit) {
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
