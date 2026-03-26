'use client';

import { motion } from 'framer-motion';
import { Shield, Star, Briefcase, CalendarDays } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="shadow-md">
        <CardContent className="pt-5 space-y-4">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${provider.id}`}>
              <UserAvatar
                name={provider.name}
                avatar={provider.avatar}
                className="w-14 h-14 cursor-pointer ring-2 ring-border"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/profile/${provider.id}`}>
                <p className="font-semibold hover:text-primary transition-colors cursor-pointer truncate">
                  {provider.name}
                </p>
              </Link>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{providerRating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({providerReviewsCount} reseñas)</span>
              </div>
              {isVerified && (
                <Badge
                  variant="secondary"
                  className="mt-1.5 text-xs bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-bold text-primary">{completedJobs}</div>
              <div className="text-xs text-muted-foreground">Trabajos</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-xl font-bold">{memberSince}</div>
              <div className="text-xs text-muted-foreground">Miembro desde</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
