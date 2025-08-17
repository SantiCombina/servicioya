'use client';

import { getCurrentUser } from '@/app/actions/user/get-current-user';
import { logoutUser } from '@/app/actions/user/logout-user';
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
import { getUserDisplayInfo } from '@/lib/helpers/user-display-info';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function UserTrigger() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (!user)
    return (
      <Button asChild variant="default" size="sm">
        <Link href="/login">Iniciar Sesión</Link>
      </Button>
    );

  const { name, email, avatarUrl } = getUserDisplayInfo(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú de usuario">
          <UserAvatar name="name" avatarUrl={avatarUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem asChild className="flex items-center py-4 cursor-pointer">
          <Link href={`/profile/${user.id}`} className="flex items-center gap-3 w-full">
            <UserAvatar avatarUrl={avatarUrl} name="name" />
            <div className="flex flex-col">
              <span className="font-medium text-sm">{name}</span>
              {email ? <span className="text-xs text-muted-foreground">{email}</span> : null}
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
