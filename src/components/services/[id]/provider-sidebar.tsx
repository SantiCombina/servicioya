import { Award, Calendar, MessageCircle, Shield, Star } from 'lucide-react';

import { Badge, Button, Card, CardContent, CardHeader, CardTitle, UserAvatar } from '@/components/ui';
import { User, Service } from '@/payload-types';

import { BookServiceDialog } from './book-service-dialog';

interface Props {
  service: Service;
  currentUser: User | null;
  completedJobs: number;
}

export function ProviderSidebar({ service, currentUser, completedJobs }: Props) {
  const provider = service.provider as User;
  const rating = service.rating || 0;
  const isVerified = service.verified || false;
  const reviewsCount = Array.isArray(service.reviews) ? service.reviews.length : 0;
  const memberSince = new Date(provider.createdAt).getFullYear().toString();

  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        {/* Provider Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <UserAvatar name={provider.name} avatar={provider.avatar} className="w-16 h-16" />
              <div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-gray-500 ml-1">({reviewsCount})</span>
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

        {/* Contact Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Contactar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <BookServiceDialog service={service} currentUser={currentUser}>
              <Button className="w-full" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Contratar servicio
              </Button>
            </BookServiceDialog>
            <Button variant="outline" className="w-full bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Enviar Mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
