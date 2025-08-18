import { Titillium_Web, Fraunces } from "next/font/google";

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
