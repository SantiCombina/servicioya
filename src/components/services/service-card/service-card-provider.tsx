import { useRouter } from 'next/navigation';

import { CardDescription } from '@/components/ui';
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
    <CardDescription>
      por{' '}
      <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={handleProviderClick}>
        {provider.name || provider.email}
      </span>
    </CardDescription>
  );
}
