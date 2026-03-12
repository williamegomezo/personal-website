import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/_next/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_MAIN_HOST || 'https://www.williamegomezo.me'}/sitemap.xml`,
  };
}
