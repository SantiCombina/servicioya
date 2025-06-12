"use client";

import { updateUser } from "@/app/actions/update-user";
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
import { updateUserSchema, UpdateUserValues } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMounted } from "@/lib/hooks/use-mounted";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UpdateUserDialogProps {
  user: User;
  currentUserRole?: 'admin' | 'user';
}

export function UpdateUserDialog({ user, currentUserRole }: UpdateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mounted = useMounted();
  
  const methods = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      password: "",
      name: user.name,
      role: user.role,
    },
  });
  const onSubmit = async (data: UpdateUserValues) => {
    try {
      const updateData = {
        email: data.email,
        name: data.name,
        role: data.role,
        ...(data.password && data.password.trim() !== '' && { password: data.password }),
      };

      await updateUser({ 
        id: user.id, 
        data: updateData
      });
      setOpen(false);
      methods.reset({
        email: user.email,
        password: "",
        name: user.name,
        role: user.role,
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  if (currentUserRole !== 'admin') {
    return null;
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        disabled
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
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
                  <FormLabel>Nueva contraseña (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Dejar vacío para mantener la actual"
                      {...field} 
                    />
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Actualizar usuario</Button>
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
