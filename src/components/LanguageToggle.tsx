"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-24 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 rounded-full bg-white/10 dark:bg-neutral-800/40 border border-black/5 dark:border-white/10 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-xl transition-colors"
        aria-label="Change language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-xs font-bold uppercase">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-14 right-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xl min-w-[120px]"
          >
            <button
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                language === "en" ? "text-blue-600 font-bold" : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage("es");
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                language === "es" ? "text-blue-600 font-bold" : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              Español
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
