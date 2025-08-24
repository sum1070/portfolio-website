import React from 'react';
import { RiNextjsFill, RiReactjsLine, RiTailwindCssFill, RiNodejsFill } from "react-icons/ri";
import { FaGithub, FaQuestion, FaAws, FaRust, FaPython, FaJava } from "react-icons/fa";
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
  python: FaPython,
  rust: FaRust,
  typescript: SiTypescript,
  java: FaJava,

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

// Create a type to represent either a React component or an SVG path
export type IconResult = React.ComponentType<any> | { path: string, type: 'svg' };

/**
 * Create a React component or return info for SVG handling
 * @param iconName icon name in lowercase for matching
 * @param iconSrc local image source path
 * @returns Either a React component for images or path info for SVGs
 */
export const createLocalSvgComponent = (iconName: string, iconSrc: string): IconResult => {
  // For SVG files, return path info object
  if (iconSrc.endsWith('.svg')) {
    return {
      path: iconSrc,
      type: 'svg'
    };
  }

  // For non-SVG files, return a React component
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
 * Get an icon component or SVG path info for the given icon name
 * @param iconName icon name in lowercase for matching
 * @param defaultIcon default to question mark icon
 * @returns React icon component or SVG path info
 */
export const getIconComponent = (iconName: string, defaultIcon = FaQuestion): IconResult => {
  const lowerName = iconName.toLowerCase();
  // use iconMap first
  if (lowerName in iconMap) {
    return createLocalSvgComponent(lowerName, iconMap[lowerName as keyof typeof iconMap]);
  }
  // use react icon if not in map
  return reactIconMap[lowerName] || defaultIcon;
};