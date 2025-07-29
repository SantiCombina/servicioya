import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

export function UserAvatar() {
  return (
    <Link href="/profile" aria-label="Go to profile" style={{ display: 'inline-block' }}>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="User Avatar" />
        <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
      </Avatar>
    </Link>
  );
}
