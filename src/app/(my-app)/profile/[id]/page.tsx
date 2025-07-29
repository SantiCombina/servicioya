export default function UserProfilePage({ params }: { params: { id: string } }) {
  // Aquí deberías obtener los datos del usuario por ID (fetch a tu API o Payload)
  // const user = await getUserById(params.id);
  // if (!user) return notFound();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">Perfil de usuario</h1>
      <p>ID de usuario: {params.id}</p>
      {/* Aquí puedes renderizar los datos del usuario, servicios ofrecidos, calificaciones, etc. */}
    </div>
  );
}
