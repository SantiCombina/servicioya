import { Button, Card, CardContent, UserAvatar } from '@/components/ui';
import { Edit, Mail } from 'lucide-react';
import { UserStars } from './user-stars';
import { User } from '@/payload-types';
import Link from 'next/link';

interface Props {
  user: User;
}

export function ProfileHeader({ user }: Props) {
  return (
    <Card className="mb-8 relative bg-card border-border">
      <div className="absolute top-4 right-4">
        <Link href={`/profile/${user.id}/edit`}>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            <Edit className="w-3 h-3 mr-1" />
          </Button>
        </Link>
      </div>

      <CardContent className="pt-8">
        <div className="flex flex-col items-center text-center space-y-1">
          <UserAvatar name={user.name} avatar={user.avatar} className="w-24 h-24" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{user.name || 'Usuario'}</h2>
            <UserStars userId={user.id} />
            <div className="flex items-center justify-center text-muted-foreground text-sm">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
