import React from 'react';
import { RiNextjsFill, RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";
import { FaHtml5, FaCss3Alt } from "react-icons/fa6";
import { contactImages } from './imageUtils';
import Image from 'next/image';

// local svg
export const localSvgIcons: Record<string, string> = {
  github: contactImages.github,
  discord: contactImages.discord,
  gmail: contactImages.email,
  instagram: contactImages.instagram,
};

export const reactIconMap: Record<string, React.ComponentType<any>> = {
  // Frontend
  javascript: RiNextjsFill,
  react: RiReactjsLine,
  tailwind: RiTailwindCssFill,
  html: FaHtml5,
  css: FaCss3Alt,
  framer: RiNextjsFill,

  // Languages
  c: RiNextjsFill,
  python: RiNextjsFill,

  // Backend
  nodejs: RiNextjsFill,
  nextjs: RiNextjsFill,

  // Database
  oracle: RiNextjsFill,

  // Tools
  git: RiNextjsFill,
  docker: RiNextjsFill,
  googlecloud: RiNextjsFill,
  aws: RiNextjsFill,

};

export const createLocalSvgComponent = (iconName: string, iconSrc: string) => {
  return ({ className, style, size = 24 }: { className?: string, style?: React.CSSProperties, size?: number }) => {
    return (
      <Image
        src={iconSrc}
        width={size}
        height={size}
        alt={`${iconName} icon`}
        className={className}
        style={style}
      />
    );
  };
};


export const getIconComponent = (iconName: string, defaultIcon = FaQuestion) => {
  const lowerName = iconName.toLowerCase();
  if (localSvgIcons[lowerName]) {
    return createLocalSvgComponent(lowerName, localSvgIcons[lowerName]);
  }
  return reactIconMap[lowerName] || defaultIcon;
};