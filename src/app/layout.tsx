import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HashScroll } from "@/components/layout/hash-scroll";
import { SplashScreen } from "@/components/layout/splash-screen";
import { AppProviders } from "@/lib/providers/app-providers";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * One typeface, used across the whole site. The variable axis lets headings go
 * to 800 and body text sit at 400 without loading extra files.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  // Real italics for the display accent — never a synthesised oblique.
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    // A page's own `title` fills the %s slot.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white">
        {/* Scroll-reveal content must never be invisible without JavaScript */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <AppProviders>
          <SplashScreen />
          <HashScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
