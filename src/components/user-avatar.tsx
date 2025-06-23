import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="User Avatar" />
      <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
    </Avatar>
  );
}
