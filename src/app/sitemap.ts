import type { MetadataRoute } from 'next';

import { getServices } from '@/app/services/service';

const BASE_URL = 'https://servicioya.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  try {
    const services = await getServices();

    const serviceRoutes: MetadataRoute.Sitemap = services
      .filter((s) => s.isActive)
      .map((service) => ({
        url: `${BASE_URL}/services/${service.id}`,
        lastModified: new Date(service.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    return [...staticRoutes, ...serviceRoutes];
  } catch {
    return staticRoutes;
  }
}
