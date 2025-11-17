import { Award, Shield, Star } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Service, User } from '@/payload-types';

interface ProviderInfoProps {
  service: Service;
  completedJobs: number;
  providerRating: number;
  providerReviewsCount: number;
}

export function ProviderInfo({ service, completedJobs, providerRating, providerReviewsCount }: ProviderInfoProps) {
  const provider = service.provider as User;
  const isVerified = service.verified || false;
  const memberSince = new Date(provider.createdAt).getFullYear().toString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Link href={`/profile/${provider.id}`}>
            <UserAvatar
              name={provider.name}
              avatar={provider.avatar}
              className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div>
            <Link href={`/profile/${provider.id}`}>
              <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer inline-block">
                {provider.name}
              </CardTitle>
            </Link>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold">{providerRating.toFixed(2)}</span>
              <span className="text-gray-500 ml-1">({providerReviewsCount})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{completedJobs}</div>
            <div className="text-xs text-muted-foreground">Trabajos realizados</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{memberSince}</div>
            <div className="text-xs text-muted-foreground">Miembro desde</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {isVerified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          )}
          <Badge variant="secondary">
            <Award className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
