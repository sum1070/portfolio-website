import type { Metadata } from "next";
import "@/styles/globals.css";
import { fraunces } from '../lib/fonts';
import { VolumeProvider } from "@/lib/context/volume-context";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { bgPrimary, LoadingScreen } from "@/components";

export const metadata: Metadata = {
  metadataBase: new URL("https://sum1070.vercel.app"),
  title: "koi · Kit Sum Chan",
  description: "Portfolio website of Kit Sum Chan (Margaret Chan)",
  openGraph: {
    title: "Kit Sum Chan | Portfolio",
    description:
      "Portfolio of Kit Sum (Margaret) Chan — AI graduate interested in UX/UI design and web development.",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Kit Sum's Portfolio — Hello, welcome to my world!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.className} !p-0`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preload" href="/images/circle-bars-palep-p.webp" as="image" />
      </head>
      <VolumeProvider>
        <body suppressHydrationWarning>
          <div id="light-bg" className="fixed inset-0 -z-50">
            {bgPrimary()}
            <div id="dark-bg" className="hidden dark:block absolute inset-0 bg-[#0e0d0d] -z-40"/>
          </div>
          {children}
          <SpeedInsights />
          <Analytics />
          <div id="page-transition-overlay" className="opacity-0 ">
            <LoadingScreen />
          </div>
        </body>
      </VolumeProvider>
    </html>
  );
}
