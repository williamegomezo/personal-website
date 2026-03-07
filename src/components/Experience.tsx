"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Experience() {
  const { dict } = useTranslation();

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-neutral-100 dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{dict.experience.title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">{dict.experience.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
        </motion.div>

        <div className="space-y-12">
          {dict.experience.items.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 sm:pl-0"
            >
              {/* Timeline line */}
              <div className="hidden sm:block absolute left-[15px] top-10 bottom-[-48px] w-[1px] bg-neutral-300 dark:bg-neutral-800 last:hidden" />
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
                <div className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 items-center justify-center relative z-10 mt-1">
                  <Briefcase className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                </div>
                
                <div className="flex-1 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/60 p-6 sm:p-8 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors shadow-sm dark:shadow-none">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full text-sm font-medium">
                      {exp.focus}
                    </span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
