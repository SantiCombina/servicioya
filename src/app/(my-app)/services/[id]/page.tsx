import {
  Badge,
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
import { Clock, MapPin, Shield } from 'lucide-react';
import { getServiceById } from '@/app/actions/service/get-service-by-id';
import { User, Review, Category, Location, Media } from '@/payload-types';
import { notFound } from 'next/navigation';
import { ServiceImageGallery } from '@/components/services/[id]/service-image-gallery';
import { StarRating } from '@/components/services/[id]/star-rating';
import { ReviewItem } from '@/components/services/[id]/review-item';
import { ProviderSidebar } from '@/components/services/[id]/provider-sidebar';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  const reviews = Array.isArray(service.reviews)
    ? service.reviews.filter((review): review is Review => typeof review === 'object')
    : [];
  // Acceso directo con type assertions
  const category = service.category as Category;
  const location = service.location as Location;

  // Manejar imágenes directamente
  const images: string[] = [];

  // Imagen principal
  if (service.image && typeof service.image === 'object') {
    const media = service.image as Media;
    if (media.url) {
      images.push(media.url);
    }
  }

  // Fotos adicionales
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
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <ServiceImageGallery images={images} title={service.title} />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">{category.name}</Badge>
                    {service.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-primary font-bold">{service.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
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
                  <TabsContent value="description" className="mt-4">
                    <p className="text-foreground leading-relaxed">{service.description}</p>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4">
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

            {/* Reviews */}
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
                    <div className="text-lg font-semibold">{service.completedJobs || 0}</div>
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

          {/* Sidebar */}
          {typeof service.provider === 'object' && <ProviderSidebar service={service} />}
        </div>
      </div>
    </div>
  );
}
