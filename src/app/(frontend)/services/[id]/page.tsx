import { Clock, MapPin, AlertTriangle } from 'lucide-react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getServiceById } from '@/app/services/service';
import { getCurrentUser } from '@/app/services/user';
import { ProviderSidebar } from '@/components/services/[id]/provider-sidebar';
import { ReviewItem } from '@/components/services/[id]/review-item';
import { ServiceImageGallery } from '@/components/services/[id]/service-image-gallery';
import { StarRating } from '@/components/services/[id]/star-rating';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { Location, Media, Review, User } from '@/payload-types';

import { getProviderCompletedJobs } from './actions';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [service, currentUser] = await Promise.all([
    getServiceById(id),
    getCurrentUser((await cookies()).get('payload-token')?.value || null),
  ]);

  if (!service) {
    notFound();
  }

  const provider = service.provider as User;
  const completedJobs = await getProviderCompletedJobs(provider.id);

  const isOwner = currentUser && (currentUser.id === provider.id || currentUser.role === 'admin');

  if (!service.isActive && !isOwner) {
    return (
      <div className="min-h-main">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-xl border border-yellow-200 p-12">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="h-12 w-12 text-orange-600" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">Servicio no disponible</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Este servicio actualmente se encuentra inactivo y no está disponible para contratación.
              </p>

              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <p className="text-orange-800 font-medium">
                  💡 El proveedor de este servicio podrá reactivarlo cuando esté disponible nuevamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const reviews = Array.isArray(service.reviews)
    ? service.reviews.filter((review): review is Review => typeof review === 'object')
    : [];
  const location = service.location as Location;

  const images: string[] = [];

  if (service.image && typeof service.image === 'object') {
    const media = service.image as Media;
    if (media.url) {
      images.push(media.url);
    }
  }

  if (service.photos) {
    service.photos.forEach((photo) => {
      if (typeof photo === 'object') {
        const media = photo as Media;
        if (media.url) {
          images.push(media.url);
        }
      }
    });
  }

  return (
    <div className="min-h-main">
      <div className="container py-12">
        {!service.isActive && isOwner && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-yellow-900 font-semibold text-lg">Tu servicio está inactivo</h3>
                <p className="text-yellow-800">
                  Este servicio no aparece en las búsquedas públicas. Solo tú puedes verlo.
                </p>
                <p className="text-yellow-700 text-sm">
                  Puedes activarlo desde la sección &ldquo;Mis Servicios&rdquo; en tu perfil.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ServiceImageGallery images={images} title={service.title} />

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {location.name}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      Desde ${service.priceFrom?.toLocaleString() || 'Consultar'}
                    </div>
                    <div className="text-sm text-muted-foreground">por servicio</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4 min-h-[96px]">
                    <p className="text-foreground leading-relaxed">{service.description}</p>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4 min-h-[96px]">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{service.availability || 'Disponibilidad a consultar'}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calificaciones y Reseñas</CardTitle>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{service.rating || 0}</div>
                    <div className="text-sm text-gray-500">Calificación</div>
                    <StarRating rating={service.rating || 0} size="sm" className="justify-center" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{reviews.length}</div>
                    <div className="text-xs text-gray-500">Reseñas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{completedJobs}</div>
                    <div className="text-xs text-gray-500">Trabajos</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.length > 0 && typeof service.provider === 'object' ? (
                    reviews.map((review) => (
                      <ReviewItem key={review.id} review={review} provider={service.provider as User} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No hay reseñas disponibles aún.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {typeof service.provider === 'object' && (
            <ProviderSidebar service={service} currentUser={currentUser} completedJobs={completedJobs} />
          )}
        </div>
      </div>
    </div>
  );
}
