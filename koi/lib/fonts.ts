import { Titillium_Web, Fraunces } from "next/font/google";
import localFont from "next/font/local";

export const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
  preload: true,
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const pxIbmVga = localFont({
  src: "../app/fonts/PxPlus_IBM_VGA_8x16.woff2",
  display: "swap",
  variable: "--font-px-ibm-vga",
});
