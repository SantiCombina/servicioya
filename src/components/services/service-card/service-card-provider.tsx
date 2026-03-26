import { useRouter } from 'next/navigation';

import { User } from '@/payload-types';

interface ServiceCardProviderProps {
  provider: User;
}

export function ServiceCardProvider({ provider }: ServiceCardProviderProps) {
  const router = useRouter();

  const handleProviderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${provider.id}`);
  };

  return (
    <p className="text-xs text-muted-foreground">
      por{' '}
      <span className="hover:text-primary transition-colors cursor-pointer" onClick={handleProviderClick}>
        {provider.name || provider.email}
      </span>
    </p>
  );
}
