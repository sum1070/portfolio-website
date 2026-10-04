import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { fraunces } from '../lib/fonts';
import { VolumeProvider } from "@/lib/context/volume-context";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { bgPrimary, LoadingScreen, TransitionOverlayWatcher } from "@/components";

const siteDescription =
  "I'm Kit Sum (Margaret) Chan, a Computer Science with AI master's student at the University of Leeds. This is where I share my projects and write-ups ♡";

export const metadata: Metadata = {
  metadataBase: new URL("https://sum1070.vercel.app"),
  title: "koi · Kit Sum Chan",
  description: siteDescription,
  openGraph: {
    title: "Kit Sum Chan | Portfolio",
    description: siteDescription,
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Kit Sum's Portfolio - Hello, welcome to my world!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.className} !p-0`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
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
          <TransitionOverlayWatcher />
        </body>
      </VolumeProvider>
    </html>
  );
}
