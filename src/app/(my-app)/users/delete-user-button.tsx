"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUser } from "@/app/actions/delete-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMounted } from "@/lib/hooks/use-mounted";

interface Props {
  id: string | number;
  currentUserRole?: 'admin' | 'user';
}

export function DeleteUserButton({ id, currentUserRole }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
    // Solo mostrar el botón si el usuario actual es administrador
  if (currentUserRole !== 'admin') {
    return null;
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        disabled
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Eliminar</span>
      </Button>
    );
  }
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser({ id });
      console.log(`Usuario ${id} eliminado`);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
