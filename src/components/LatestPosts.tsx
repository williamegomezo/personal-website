"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

interface LatestPostsProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const { language } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              {language === "es" ? "Últimos Artículos" : "Latest Articles"}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {language === "es" 
                ? "Comparto mis conocimientos sobre arquitectura, backend y datos." 
                : "Sharing my thoughts on architecture, backend and data."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-800 transition-all hover:border-blue-500/50 dark:hover:border-blue-500/50"
            >
              <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View post</span>
              </Link>

              {post.coverImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow">
                <time className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 block">
                  {formatDate(post.publishedAt)}
                </time>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.brief}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white group/link">
                  <span>{language === "es" ? "Leer más" : "Read more"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
