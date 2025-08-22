import React from 'react';
import { RiNextjsFill, RiReactjsLine, RiTailwindCssFill, RiNodejsFill } from "react-icons/ri";
import { FaGithub, FaQuestion, FaAws, FaRust } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaDocker } from "react-icons/fa6";
import { SiOracle, SiTypescript } from "react-icons/si";
import { iconMap } from './image-utils';
import Image from 'next/image';
import { BiLogoGoogleCloud } from "react-icons/bi";

export const reactIconMap: Record<string, React.ComponentType<any>> = {
  // Frontend
  javascript: RiNextjsFill,
  react: RiReactjsLine,
  tailwind: RiTailwindCssFill,
  html: FaHtml5,
  css: FaCss3Alt,

  // Languages
  python: RiNextjsFill,
  rust: FaRust,
  typescript: SiTypescript,

  // Backend
  nodejs: RiNodejsFill,
  nextjs: RiNextjsFill,

  // Database
  oracle: SiOracle,

  // Tools
  googlecloud: BiLogoGoogleCloud,
  docker: FaDocker,
  aws: FaAws,
  github: FaGithub,
};

/**
 * Create a React component that renders a local SVG image
 * @param iconName icon name in lowercase for matching
 * @param iconSrc local image source path
 * @returns React component that renders the SVG image
 */
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

/**
 *
 * @param iconName icon name in lowercase for matching
 * @param defaultIcon default to question mark icon
 * @returns React icon component
 */
export const getIconComponent = (iconName: string, defaultIcon = FaQuestion) => {
  const lowerName = iconName.toLowerCase();
  // use iconMap first
  if (lowerName in iconMap) {
    return createLocalSvgComponent(lowerName, iconMap[lowerName as keyof typeof iconMap]);
  }
  // use react icon if not in map
  return reactIconMap[lowerName] || defaultIcon;
};