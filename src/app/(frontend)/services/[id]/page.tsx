import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getServiceById } from '@/app/services/service';
import { getUserRating } from '@/app/services/user';
import { ProviderSidebar } from '@/components/services/[id]/provider-sidebar/provider-sidebar';
import { ServiceComments } from '@/components/services/[id]/service-comments/service-comments';
import { ServiceCompleteInfo } from '@/components/services/[id]/service-info/service-complete-info';
import { ServiceImages } from '@/components/services/[id]/service-info/service-images';
import { ServiceReviewsTabs } from '@/components/services/[id]/service-info/service-reviews-tabs';
import { InactiveServiceMessage } from '@/components/services/[id]/service-status/inactive-service-message';
import { OwnerInactiveBanner } from '@/components/services/[id]/service-status/owner-inactive-banner';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';
import { Location, Review, User } from '@/payload-types';

import { getCommentsByServiceAction, getProviderCompletedJobsAction, getServiceCompletedJobsAction } from './actions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    return { title: 'Servicio no encontrado | ServicioYa' };
  }

  const imageUrl = typeof service.image === 'object' && service.image?.url ? service.image.url : undefined;
  const description = service.description
    ? service.description.slice(0, 160)
    : `Contratá a ${typeof service.provider === 'object' ? service.provider.name : ''} en ServicioYa.`;

  return {
    title: `${service.title} | ServicioYa`,
    description,
    openGraph: {
      title: `${service.title} | ServicioYa`,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | ServicioYa`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [service, currentUserResult, comments] = await Promise.all([
    getServiceById(id),
    getCurrentUserAction({}),
    getCommentsByServiceAction(id),
  ]);

  const currentUser = currentUserResult.data?.user || null;

  if (!service) {
    notFound();
  }

  const provider = service.provider as User;
  const completedJobs = await getProviderCompletedJobsAction(provider.id);
  const serviceCompletedJobs = await getServiceCompletedJobsAction(service.id);
  const providerRatingData = await getUserRating(provider.id.toString());

  const providerId = typeof service.provider === 'object' ? service.provider.id : service.provider;
  const isOwner = currentUser && (currentUser.id.toString() === providerId.toString() || currentUser.role === 'admin');

  if (!service.isActive && !isOwner) {
    return <InactiveServiceMessage />;
  }

  const reviews = Array.isArray(service.reviews)
    ? service.reviews.filter(
        (review): review is Review => typeof review === 'object' && review !== null && 'id' in review,
      )
    : [];
  const location = service.location as Location;

  const providerName = typeof service.provider === 'object' ? service.provider.name : '';
  const imageUrl = typeof service.image === 'object' && service.image?.url ? service.image.url : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description ?? '',
    provider: {
      '@type': 'Person',
      name: providerName,
    },
    areaServed: {
      '@type': 'Place',
      name: typeof service.location === 'object' ? service.location.name : '',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: service.priceFrom,
    },
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(service.rating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: service.rating, bestRating: 5 } }
      : {}),
  };

  return (
    <div className="min-h-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container py-12">
        {!service.isActive && isOwner && <OwnerInactiveBanner />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ServiceImages service={service} />

            <ServiceCompleteInfo service={service} location={location} serviceCompletedJobs={serviceCompletedJobs} />

            {/* Contact section - shows after ServiceCompleteInfo on mobile, sidebar on desktop */}
            <div className="lg:hidden space-y-6">
              {typeof service.provider === 'object' && (
                <ProviderSidebar
                  service={service}
                  currentUser={currentUser}
                  completedJobs={completedJobs}
                  providerRating={providerRatingData?.avgRating || 0}
                  providerReviewsCount={providerRatingData?.totalReviews || 0}
                />
              )}
            </div>

            <ServiceReviewsTabs service={service} reviews={reviews} />

            <ServiceComments
              serviceId={service.id.toString()}
              comments={comments}
              currentUserId={currentUser?.id.toString() || null}
              currentUserRole={currentUser?.role || null}
              serviceProviderId={providerId.toString()}
            />
          </div>

          {/* Desktop sidebar */}
          {typeof service.provider === 'object' && (
            <div className="hidden lg:block">
              <ProviderSidebar
                service={service}
                currentUser={currentUser}
                completedJobs={completedJobs}
                providerRating={providerRatingData?.avgRating || 0}
                providerReviewsCount={providerRatingData?.totalReviews || 0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
