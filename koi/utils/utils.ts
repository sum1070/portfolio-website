import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sounds = {
  bell: "/sounds/bell.wav", //https://freesound.org/people/GabFitzgerald/sounds/625174/
  bubble: "/sounds/bubble.mp3", // https://freesound.org/people/mokasza/sounds/810164/
  glimmer: "/sounds/glimmer.wav", //https://freesound.org/people/opticaillusions/sounds/521873/
  sparkle: "/sounds/sparkle.mp3", // https://freesound.org/people/Soughtaftersounds/sounds/145459/
  tinkle: "/sounds/tinkle.flac", // https://freesound.org/people/Timbre/sounds/221683/
  music: "/sounds/music_DeepTheme_Audio_Spring_Hazes_34.mp3", // https://www.zapsplat.com/music/spring-hazes-slow-dreamy-and-carefree-musical-bumper-stinger-intro-outro/
  // NOT USED:
  sweetsaw: "/sounds/sweetsaw.wav", //https://freesound.org/people/newlocknew/sounds/515830/
  switch: "/sounds/switch-toggle.wav", // https://freesound.org/people/Rudmer_Rotteveel/sounds/457458/
};

export const pageIDs = {
  home: "home",
  about: "about",
  projects: "projects",
  contact: "contact",
  licences: "licences",
};

export const navLinks = [
  { name: "Home", href: `/` },
  { name: "About", href: `/#${pageIDs.about}` },
  { name: "Projects", href: `/${pageIDs.projects}` },
  { name: "Contact", href: `/${pageIDs.contact}` },
  { name: "Licences", href: `/${pageIDs.licences}` },
];

export const gradient = {
  purple: " gradient-purple ",
  deepBlue: " gradient-deep-blue ",
  limeBlue: " gradient-lime-blue ",
  insta: " gradient-insta ",
  paleBlue: " gradient-pale-blue ",
  ssr: " gradient-ssr ",
  one: " gradient-1 ",
  two: " gradient-2 ",
  default: " gradient-default ",
};
