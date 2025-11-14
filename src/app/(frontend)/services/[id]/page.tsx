import { notFound } from 'next/navigation';

import { getServiceById } from '@/app/services/service';
import { ProviderSidebar } from '@/components/services/[id]/provider-sidebar/provider-sidebar';
import { ServiceComments } from '@/components/services/[id]/service-comments/service-comments';
import { ServiceDescription } from '@/components/services/[id]/service-info/service-description';
import { ServiceHeader } from '@/components/services/[id]/service-info/service-header';
import { ServiceImages } from '@/components/services/[id]/service-info/service-images';
import { ServiceReviews } from '@/components/services/[id]/service-info/service-reviews';
import { InactiveServiceMessage } from '@/components/services/[id]/service-status/inactive-service-message';
import { OwnerInactiveBanner } from '@/components/services/[id]/service-status/owner-inactive-banner';
import { Card } from '@/components/ui/card';
import { getCurrentUserAction } from '@/components/ui/navbar/actions';
import { Location, Review, User } from '@/payload-types';

import { getCommentsByServiceAction, getProviderCompletedJobsAction } from './actions';

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

  return (
    <div className="min-h-main">
      <div className="container py-12">
        {!service.isActive && isOwner && <OwnerInactiveBanner />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ServiceImages service={service} />

            <Card>
              <ServiceHeader service={service} location={location} />
              <ServiceDescription service={service} />
            </Card>

            <ServiceReviews service={service} reviews={reviews} completedJobs={completedJobs} />

            <ServiceComments
              serviceId={service.id.toString()}
              comments={comments}
              currentUserId={currentUser?.id.toString() || null}
              currentUserRole={currentUser?.role || null}
              serviceProviderId={providerId.toString()}
            />
          </div>

          {typeof service.provider === 'object' && (
            <ProviderSidebar service={service} currentUser={currentUser} completedJobs={completedJobs} />
          )}
        </div>
      </div>
    </div>
  );
}
