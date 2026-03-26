import { Edit, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/ui/user-avatar';
import { User } from '@/payload-types';

import { UserStars } from './user-stars';

interface Props {
  user: User;
  currentUser?: User | null;
}

export function ProfileHeader({ user, currentUser }: Props) {
  const canEdit = currentUser && (currentUser.id === user.id || currentUser.role === 'admin');

  return (
    <Card className="mb-8 overflow-hidden border-border">
      <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />

      <CardContent className="pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <UserAvatar
              name={user.name}
              avatar={user.avatar}
              className="w-24 h-24 ring-4 ring-background shadow-md shrink-0"
            />
            <div className="pb-1 space-y-1">
              <h2 className="text-2xl font-bold text-foreground">{user.name || 'Usuario'}</h2>
              <UserStars userId={user.id} />
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                <div className="flex items-center text-muted-foreground text-sm gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center text-muted-foreground text-sm gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {typeof user.location === 'object' && user.location && 'name' in user.location && (
                  <div className="flex items-center text-muted-foreground text-sm gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{(user.location as { name: string }).name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {canEdit && (
            <Button variant="outline" size="sm" className="self-start sm:self-auto shrink-0" asChild>
              <Link href={`/profile/${user.id}/edit`}>
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Editar perfil
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
