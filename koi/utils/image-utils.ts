export const soundButtonImages = {
  soundOn: "/images/sound-on.svg",
  soundOff: "/images/sound-off.svg",
};

export const myImages = {
  avatar: "/images/avatar.m.webp",
}

export const iconImages = {
  nekoSleep: "/images/neko-sleep.svg", // https://www.svgrepo.com/svg/368239/neko-sleep
  sleepZZZ: "/animation/zzz-purple.webm", // https://www.svgrepo.com/svg/479301/sleep
  zzzBlue: "/animation/zzz-blue.webm",
  attr4: "/images/attr4.svg", // https://www.svgrepo.com/svg/353062/creative-commons-attribution
  medal: "/images/medal.svg", // https://www.svgrepo.com/svg/495465/medal-star
  watching: "/images/watching.svg", // https://www.svgrepo.com/svg/28048/watching
  cat1: "/images/cat1.svg", // https://www.svgrepo.com/svg/33137/cat-in-black-silhouette
  arrowDown: "/images/arrow-down.svg", // https://www.svgrepo.com/svg/108052/arrow-down-filled-triangle
  sleepy: "/images/sleepy.svg",
  flatIcon: "/images/flat-icon.svg", // https://www.svgrepo.com/svg/505949/flat-icon
};

export const techImages = {
  motion: "/images/motion.svg", // https://www.svgrepo.com/svg/315753/menu-motion
  c: "/images/c.svg",
  git: "/images/git.svg", // self-made
};

export const contactImages = {
  github: "/images/github.svg",
  discord: "/images/discord.svg", // hhttps://www.svgrepo.com/svg/506463/discord
  email: "/images/email.svg",
  instagram: "/images/instagram.svg",
};

export const iconMap = {
  github: contactImages.github,
  discord: contactImages.discord,
  gmail: contactImages.email,
  instagram: contactImages.instagram,

  motion: techImages.motion,
  c: techImages.c,
  git: techImages.git,

  ...Object.entries(iconImages).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {} as Record<string, string>),
};
