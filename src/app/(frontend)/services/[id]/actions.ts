'use server';

import { getProviderCompletedJobs as getProviderCompletedJobsService } from '@/app/services/booking';

export const getProviderCompletedJobs = async (providerId: string | number) => {
  try {
    return await getProviderCompletedJobsService(providerId);
  } catch (error) {
    console.error('Error getting provider completed jobs:', error);
    return 0;
  }
};
