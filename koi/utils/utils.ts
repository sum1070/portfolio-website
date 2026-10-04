import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// true when the browser should handle the click itself (ctrl/cmd click for a
// new tab, shift click for a new window, alt click to download, non-left button)
export function isModifiedClick(e: { ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; altKey: boolean; button: number }) {
  return e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0;
}

export const sounds = {
  bell: "/sounds/bell.wav", //https://freesound.org/people/GabFitzgerald/sounds/625174/
  bubble: "/sounds/bubble.mp3", // https://freesound.org/people/mokasza/sounds/810164/
  switch: "/sounds/switch-toggle.wav", // https://freesound.org/people/Rudmer_Rotteveel/sounds/457458/
  music: "/sounds/groovy-beat.mp3", // https://freesound.org/people/Seth_Makes_Sounds/sounds/659748/
};

// Applied on top of the master volume
export const soundGains = {
  music: 1,
  se: 0.3,
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
  { name: "About", href: `/${pageIDs.about}` },
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
