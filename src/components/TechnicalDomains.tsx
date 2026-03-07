"use client";

import { motion } from "framer-motion";
import { Database, Server, Layout, Terminal } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function TechnicalDomains() {
  const { dict } = useTranslation();
  
  const icons = [
    <Database key="db" className="w-8 h-8 text-blue-400" />,
    <Server key="srv" className="w-8 h-8 text-indigo-400" />,
    <Layout key="lay" className="w-8 h-8 text-purple-400" />,
    <Terminal key="trm" className="w-8 h-8 text-teal-400" />
  ];

  const stacks = [
    ["GCP", "BigQuery", "dbt", "Airflow", "Docker", "Terraform"],
    ["Python", "Node.js", "GraphQL", "AI Integrations", "OpenAI"],
    ["React", "Next.js", "JavaScript", "Tailwind CSS"],
    ["Kubernetes", "GitHub Actions", "CircleCI", "DataDog"]
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-neutral-50 dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{dict.domains.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dict.domains.items.map((domain, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-950 inline-block rounded-xl border border-neutral-200 dark:border-neutral-800 group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3">{domain.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                {domain.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {stacks[idx].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
