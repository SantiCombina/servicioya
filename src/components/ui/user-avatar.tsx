import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Media } from '@/payload-types';

interface Props {
  name?: string | null;
  avatar?: (number | null) | Media;
  className?: string;
}

export function UserAvatar({ name, avatar, className }: Props) {
  const fallback = name && name.length > 0 ? name[0].toUpperCase() : 'U';

  const imageUrl = avatar && typeof avatar === 'object' && avatar.url ? avatar.url : undefined;

  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} alt="Avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
