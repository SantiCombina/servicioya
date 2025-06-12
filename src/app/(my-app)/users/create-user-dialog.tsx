"use client";

import { createUser } from "@/app/actions/create-user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserSchema, CreateUserValues } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMounted } from "@/lib/hooks/use-mounted";

interface CreateUserDialogProps {
  currentUserRole?: 'admin' | 'user';
}

export function CreateUserDialog({ currentUserRole }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mounted = useMounted();
  
  const methods = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "user",
    },
  });

  const onSubmit = async (data: CreateUserValues) => {
    try {
      await createUser({ data });
      setOpen(false);
      methods.reset();
      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (currentUserRole !== 'admin') {
    return null;
  }

  if (!mounted) {
    return (
      <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" disabled>
        <Plus className="h-4 w-4" />
        Nuevo usuario
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4" />
          Nuevo usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo usuario</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Usuario</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Crear usuario</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  methods.reset();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
