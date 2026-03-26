import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/profile/*/edit',
          '/profile/*/my-services/new',
          '/profile/*/my-services/*/edit',
        ],
      },
    ],
    sitemap: 'https://servicioya.vercel.app/sitemap.xml',
  };
}
