'use client';

import { motion } from 'framer-motion';

import { Service, User } from '@/payload-types';

import { ContactActions } from './contact-actions';
import { ProviderInfo } from './provider-info';

interface Props {
  service: Service;
  currentUser: User | null;
  completedJobs: number;
  providerRating: number;
  providerReviewsCount: number;
}

export function ProviderSidebar({ service, currentUser, completedJobs, providerRating, providerReviewsCount }: Props) {
  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="order-2 lg:order-1">
        <ProviderInfo
          service={service}
          completedJobs={completedJobs}
          providerRating={providerRating}
          providerReviewsCount={providerReviewsCount}
        />
      </div>
      <div className="order-1 lg:order-2">
        <ContactActions service={service} currentUser={currentUser} />
      </div>
    </motion.div>
  );
}
