'use server';

import { getServices } from '@/app/services/service';

export const getServicesWithCompletedJobs = async () => {
  try {
    return await getServices();
  } catch (error) {
    console.error('Error getting services with completed jobs:', error);
    return [];
  }
};
