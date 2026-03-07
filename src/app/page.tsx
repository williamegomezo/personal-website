import Hero from "@/components/Hero";
import TechnicalDomains from "@/components/TechnicalDomains";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-blue-500/30">
      <ThemeToggle />
      <LanguageToggle />
      <Hero />
      <TechnicalDomains />
      <Experience />
      <Footer />
    </main>
  );
}
