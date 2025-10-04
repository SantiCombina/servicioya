import { Service, User } from '@/payload-types';

import { ContactActions } from './contact-actions';
import { ProviderInfo } from './provider-info';

interface Props {
  service: Service;
  currentUser: User | null;
  completedJobs: number;
}

export function ProviderSidebar({ service, currentUser, completedJobs }: Props) {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <ProviderInfo service={service} completedJobs={completedJobs} />
        <ContactActions service={service} currentUser={currentUser} />
      </div>
    </div>
  );
}
