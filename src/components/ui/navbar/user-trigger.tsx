'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/services/user/get-current-user';
import { useAction } from 'next-safe-action/hooks';
import { userLogout } from './action';
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
import { User } from '@/payload-types';
import Link from 'next/link';

export function UserTrigger() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { executeAsync: executeLogout } = useAction(userLogout);

  const handleLogout = async () => {
    executeLogout({});
    setUser(null);
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
