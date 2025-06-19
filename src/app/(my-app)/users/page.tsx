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

function UsersLoading() {
  return (
    <div className="border rounded-lg animate-pulse">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="w-20 h-5 rounded bg-muted"></div>
            </TableHead>
            <TableHead>
              <div className="w-32 h-5 rounded bg-muted"></div>
            </TableHead>
            <TableHead>
              <div className="w-40 h-5 rounded bg-muted"></div>
            </TableHead>
            <TableHead>
              <div className="w-24 h-5 rounded bg-muted"></div>
            </TableHead>
            <TableHead className="text-right w-[100px]">
              <div className="w-16 h-5 ml-auto rounded bg-muted"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="w-8 h-8 rounded-full bg-muted"></div>
              </TableCell>
              <TableCell>
                <div className="w-24 h-5 rounded bg-muted"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 rounded w-36 bg-muted"></div>
              </TableCell>
              <TableCell>
                <div className="w-20 h-5 rounded bg-muted"></div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <div className="w-8 h-8 rounded bg-muted"></div>
                  <div className="w-8 h-8 rounded bg-muted"></div>
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
    <div className="w-full max-w-md p-6 mx-auto text-center border rounded-lg shadow-sm bg-card text-card-foreground border-destructive/50">
      <p className="mb-4 text-destructive">
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
    <main className="flex flex-col items-center p-6 min-h-dvh md:p-12">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-4 mb-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Usuarios
            </h1>
            <p className="mt-1 text-muted-foreground">
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
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center border rounded-lg bg-card">
          <Users2 className="w-16 h-16 mb-4 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-semibold">
            No hay usuarios registrados
          </h3>{" "}
          <p className="max-w-xs mb-6 text-muted-foreground">
            Comienza agregando el primer usuario para administrar tu aplicación.
          </p>
          {currentUser?.role === "admin" && (
            <CreateUserDialog currentUserRole={currentUser.role} />
          )}
        </div>
      );
    }

    return (
      <div className="border rounded-lg">
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
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
                  <div className="flex items-center justify-end gap-2">
                    <UpdateUserDialog
                      user={{
                        id: user.id.toString(),
                        name: user.name || "",
                        email: user.email,
                        role: user.role,
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
      <div className="flex justify-center w-full">
        <UsersError error={error as Error} />
      </div>
    );
  }
}
