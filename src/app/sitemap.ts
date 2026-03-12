import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_MAIN_HOST || 'https://www.williamegomezo.me';

  // Obtener slugs de Hashnode
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPostSlugs();
    blogPosts = slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating sitemap for blog posts:', error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
