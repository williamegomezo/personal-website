import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { TimeThemeHandler } from "@/components/TimeThemeHandler";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_HOST || 'https://www.williamegomezo.me'),
  title: "William Gómez | Senior End-to-End Engineer",
  description: "Construyo soluciones robustas de principio a fin.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://gql.hashnode.com" />
        <link rel="preconnect" href="https://cdn.hashnode.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://gql.hashnode.com" />
        <link rel="dns-prefetch" href="https://cdn.hashnode.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="6a7d3282-5a38-4c7d-8db2-87b1ccca15bc"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TimeThemeHandler />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
