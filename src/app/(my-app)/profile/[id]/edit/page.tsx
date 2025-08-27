import { getCurrentUser } from '@/app/services/user/get-current-user';
import { getUserById } from '@/app/services/user/get-user-by-id';
import { EditProfileForm } from '@/components/profile/[id]/edit/edit-profile-form';
import { redirect } from 'next/navigation';

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
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
