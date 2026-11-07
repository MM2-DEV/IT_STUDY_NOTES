import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TopicsPreferences } from "@/components/topics/topics-preferences";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bengali glyphs fall back to Noto Sans Bengali (see --font-sans in globals.css).
const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes and TopicsPreferences set attributes on <html> before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Sets the remembered exam filter and sidebar state on <html> before anything is painted. */}
        <TopicsPreferences />
        <ThemeProvider>
          <SiteHeader />
          {/* Every page has a dotted background between the header and the footer. The
              sidebars have their own solid background, so the dots do not show behind them. */}
          <div className="relative isolate flex flex-1 flex-col">
            <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 -z-10" />
            {children}
          </div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
