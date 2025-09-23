'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  UserAvatar,
} from '@/components/ui';

import { getCurrentUserAction, userLogout } from './actions';

export function UserTrigger() {
  const router = useRouter();
  const { execute: loadCurrentUser, result: userResult, isExecuting: isLoadingUser } = useAction(getCurrentUserAction);

  const { executeAsync: executeLogout } = useAction(userLogout, {
    onSuccess: () => {
      loadCurrentUser({});
      router.push('/');
    },
    onError: (error) => {
      console.error('Error during logout:', error);
    },
  });

  const handleLogout = async () => {
    await executeLogout({});
  };

  useEffect(() => {
    loadCurrentUser({});

    // Escuchar evento de actualización de usuario
    const handleUserUpdate = (event: CustomEvent) => {
      console.log('Evento user-updated recibido:', event.detail);
      if (event.detail) {
        window.location.reload();
      }
    };

    window.addEventListener('user-updated', handleUserUpdate as EventListener);

    return () => {
      window.removeEventListener('user-updated', handleUserUpdate as EventListener);
    };
  }, []);

  const user = userResult.data?.user || null;

  if (isLoadingUser) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (!user)
    return (
      <Button asChild variant="default" size="sm">
        <Link href="/login">Iniciar Sesión</Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú de usuario">
          <UserAvatar name={user.name} avatar={user.avatar} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem asChild className="flex items-center py-4 cursor-pointer">
          <Link href={`/profile/${user.id}`} className="flex items-center gap-3 w-full">
            <UserAvatar avatar={user.avatar} name={user.name} />
            <div className="flex flex-col">
              <span className="font-medium text-sm">{user.name}</span>
              {user.email ? <span className="text-xs text-muted-foreground">{user.email}</span> : null}
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
