import { getLatestPosts } from "@/lib/hashnode";
import Link from "next/link";
import LatestPosts from "@/components/LatestPosts";
import { ArrowLeft } from "lucide-react";


export default async function BlogIndexPage() {
  const posts = await getLatestPosts(20);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <header className="py-12 px-6 sm:px-12 lg:px-24 border-b border-neutral-100 dark:border-neutral-900 border-opacity-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">williamegomezo Blog</h1>
          <Link
            href="/"
            className="text-sm font-bold text-neutral-500 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </header>
      <LatestPosts posts={posts} />
    </main>
  );
}
