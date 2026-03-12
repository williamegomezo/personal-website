"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Footer() {
  const { dict } = useTranslation();

  return (
    <footer className="py-20 px-6 sm:px-12 lg:px-24 bg-white dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-900 border-opacity-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
            {dict.footer.title_line1} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              {dict.footer.title_line2}
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium mb-10">
            {dict.footer.subtitle}
          </p>
          <Link
            href="https://calendly.com/williamegomezo"
            target="_blank"
            data-umami-event="Schedule-Meeting-Click"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xl hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            {dict.hero.cta_talk}
          </Link>
          <div className="mt-6">
            <Link 
              href="mailto:williamegomezo@gmail.com"
              data-umami-event="Social-Link-Email-Click"
              className="text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              williamegomezo@gmail.com
            </Link>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="w-full pt-8 border-t border-neutral-200 dark:border-neutral-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500"
        >
          <p>© {new Date().getFullYear()} William Gómez. Senior End-to-End Engineer.</p>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-400 dark:text-neutral-400" />
            <span>{dict.footer.location}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
