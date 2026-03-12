import { getPostBySlug, getAllPostSlugs } from "@/lib/hashnode";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    
    // If no posts are found, we return a fallback slug to prevent build errors
    // with 'output: export'. The page will naturally return 404 for this slug.
    if (!slugs || slugs.length === 0) {
      return [{ slug: 'empty' }];
    }

    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [{ slug: 'error' }];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | William Gómez Blog`,
    description: post.brief,
    openGraph: {
      title: post.title,
      description: post.brief,
      images: post.coverImage ? [{ url: post.coverImage.url }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-24">
      {/* Header / Hero */}
      <header className="relative py-24 px-6 sm:px-12 lg:px-24 border-b border-neutral-100 dark:border-neutral-900 border-opacity-50">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author.name}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {post.coverImage && (
            <div className="relative aspect-[21/9] w-full mt-12 overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-900 shadow-2xl">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
          prose-headings:font-extrabold prose-headings:tracking-tight 
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-2xl prose-img:border prose-img:border-neutral-100 dark:prose-img:border-neutral-900"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.html) }}
        />
      </div>

      {/* Footer CTA */}
      <footer className="max-w-4xl mx-auto px-6 mt-24 pt-12 border-t border-neutral-100 dark:border-neutral-900">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          More Articles at Home
        </Link>
      </footer>
    </article>
  );
}
