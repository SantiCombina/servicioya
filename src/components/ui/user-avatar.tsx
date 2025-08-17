import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

interface Props {
  name?: string;
  avatarUrl?: string;
  className?: string;
}

export function UserAvatar({ name, avatarUrl, className }: Props) {
  const fallback = name && name.length > 0 ? name[0].toUpperCase() : 'U';

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl} alt="Avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
