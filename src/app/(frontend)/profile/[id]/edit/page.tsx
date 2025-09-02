import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getCurrentUser, getUserById } from '@/app/services/user';
import { EditProfileForm } from '@/components/profile/[id]/edit/edit-profile-form';

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value || null;

  const currentUser = await getCurrentUser(token);
  const userToEdit = await getUserById(id);

  if (!currentUser) {
    redirect('/login');
  }

  if (!userToEdit) {
    return <div>Usuario no encontrado</div>;
  }

  const canEdit = currentUser.id === userToEdit.id || currentUser.role === 'admin';

  if (!canEdit) {
    redirect(`/profile/${id}`);
  }
  return (
    <div className="min-h-main">
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
        <EditProfileForm user={userToEdit} />
      </main>
    </div>
  );
}
