'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { logoutAction } from '@/app/actions/logout';
import { getCurrentUser } from '@/app/actions/get-current-user';

export function UserAvatar() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logoutAction();
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

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="transition-all duration-300 ease-in-out opacity-50 scale-95"
      >
        <div className="w-8 h-8 rounded-full bg-current opacity-30 animate-pulse" />
      </Button>
    );
  }

  if (!user) return null;

  const name = user.name || user.fullName || user.email?.split('@')[0] || 'Usuario';
  const email = user.email || '';
  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú de usuario">
          <Avatar>
            <AvatarImage src={avatarUrl} alt="Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild className="flex items-center gap-3 p-2 cursor-pointer">
          <Link href={`/profile/${user.id}`} className="flex items-center gap-3 w-full">
            <Avatar>
              <AvatarImage src={avatarUrl} alt="Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {name[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
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
