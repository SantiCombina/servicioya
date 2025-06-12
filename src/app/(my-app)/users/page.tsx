import { getCurrentUser } from "@/app/actions/get-current-user";
import { getUsers } from "@/app/actions/get-users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CreateUserDialog } from "./create-user-dialog";
import { DeleteUserButton } from "./delete-user-button";
import { UpdateUserDialog } from "./update-user-dialog";

export const metadata = {
  title: "Usuarios | Next Payload CMS",
  description: "Gestiona los usuarios de tu aplicación",
};

function UsersLoading() {
  return (
    <div className="rounded-lg border animate-pulse">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="h-5 w-20 bg-muted rounded"></div>
            </TableHead>
            <TableHead>
              <div className="h-5 w-32 bg-muted rounded"></div>
            </TableHead>
            <TableHead>
              <div className="h-5 w-40 bg-muted rounded"></div>
            </TableHead>
            <TableHead>
              <div className="h-5 w-24 bg-muted rounded"></div>
            </TableHead>
            <TableHead className="text-right w-[100px]">
              <div className="h-5 w-16 bg-muted rounded ml-auto"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-8 w-8 bg-muted rounded-full"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 w-24 bg-muted rounded"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 w-36 bg-muted rounded"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 w-20 bg-muted rounded"></div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 bg-muted rounded"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UsersError({ error }: { error: Error }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-destructive/50 p-6 text-center w-full max-w-md mx-auto">
      <p className="text-destructive mb-4">
        Error al cargar usuarios: {error.message}
      </p>
      <Button asChild variant="outline">
        <Link href="/users">Reintentar</Link>
      </Button>
    </div>
  );
}

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-12">
      <div className="w-full max-w-4xl">        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Usuarios
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona los usuarios de tu aplicación.
            </p>
          </div>
          <CreateUserDialog currentUserRole={currentUser?.role} />
        </div>
        <Suspense fallback={<UsersLoading />}>
          <UsersList />
        </Suspense>
      </div>
    </main>
  );
}

async function UsersList() {
  try {
    const [users, currentUser] = await Promise.all([
      getUsers(),
      getCurrentUser(),
    ]);

    if (!users?.length) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 border rounded-lg bg-card">
          <Users2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            No hay usuarios registrados
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Comienza agregando el primer usuario para administrar tu aplicación.
          </p>          {currentUser?.role === "admin" && (
            <CreateUserDialog currentUserRole={currentUser.role} />
          )}
        </div>
      );
    }    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-right w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {user.name || "N/A"}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {user.role === "admin" ? "Administrador" : "Usuario"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <UpdateUserDialog
                      user={{
                        id: user.id.toString(),
                        name: user.name || '',
                        email: user.email,
                        role: user.role
                      }}
                      currentUserRole={currentUser?.role}
                    />
                    <DeleteUserButton
                      id={user.id}
                      currentUserRole={currentUser?.role}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full flex justify-center">
        <UsersError error={error as Error} />
      </div>
    );
  }
}
