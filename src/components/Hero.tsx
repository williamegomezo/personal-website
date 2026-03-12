"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Calendar, Download, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../../public/profile.jpg";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Hero() {
  const { dict } = useTranslation();
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Background glow effect for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 max-w-4xl text-left sm:text-center flex flex-col items-start sm:items-center pt-20">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 blur-2xl rounded-full" />
          <Image
            src={profilePic}
            alt={dict.hero.title}
            priority
            fetchPriority="high"
            placeholder="blur"
            className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full border-4 border-white dark:border-neutral-800 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4"
        >
          {dict.hero.title}
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
        >
          {dict.hero.subtitle}
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed"
        >
          {dict.hero.description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="https://calendly.com/williamegomezo"
            target="_blank"
            data-umami-event="Schedule-Meeting-Click"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Calendar className="w-5 h-5" />
            {dict.hero.cta_talk}
          </Link>
          <Link
            href="/cv.pdf"
            target="_blank"
            data-umami-event="Download-CV-Click"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-black dark:text-white font-semibold rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Download className="w-5 h-5" />
            {dict.hero.cta_cv}
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="flex items-center gap-6 mt-12"
        >
          <Link 
            href="mailto:williamegomezo@gmail.com" 
            data-umami-event="Social-Link-Email-Click"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <Mail className="w-7 h-7" />
            <span className="sr-only">Email</span>
          </Link>
          <Link 
            href="https://linkedin.com/in/williamegomezo" 
            target="_blank" 
            data-umami-event="Social-Link-LinkedIn-Click"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <Linkedin className="w-7 h-7" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link 
            href="https://github.com/williamegomezo" 
            target="_blank" 
            data-umami-event="Social-Link-GitHub-Click"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <Github className="w-7 h-7" />
            <span className="sr-only">GitHub</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
