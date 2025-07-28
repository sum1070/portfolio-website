import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTransform, useSpring, MotionValue } from "framer-motion";

// merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// useSpring
export function springY(
  scrollY: MotionValue<number>,
  outputRange: [number, number],
  inputRange: [number, number] = [0, 500],
  config: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  } = {}
) {
  const { stiffness = 70, damping = 20, mass = 1.2 } = config;

  const transformed = useTransform(scrollY, inputRange, outputRange);

  return useSpring(transformed, { stiffness, damping, mass });
}

export const borderColor = [
  "4px solid #BAEBFF", // blue
  "4px solid #CAD4FF",
  "4px solid #D9BAFF", // purple
  "4px solid #ECBEF4",
  "4px solid #FFBAF5", // pink
  "4px solid #FFCFE1",
  "2px solid #FFE3CE", // pale orange
  "4px solid #EEFCBA",
  "4px solid #DDFFBA", // green
  "4px solid #FFB7C1",
  "4px solid #FFBAF5", // pink
  "4px solid #E2DFD4",
  "4px solid #C5FFBF", // green
  "4px solid #CBFDDF",
  "4px solid #D1FAFF", // light blue
  "4px solid #CAD4FF",
  "4px solid #D9BAFF", // purple
  "4px solid #CAD4FF",
  "4px solid #BAEBFF", // blue
  "4px solid #C6F3FF", // light blue 2
];
export const boxShadow = [
  "0 0 50px #BAEBFF", // blue
  "0 0 30px #CAD4FF",
  "0 0 30px #D9BAFF", // purple
  "0 0 30px #ECBEF4",
  "0 0 50px #FFBAF5", // pink
  "0 0 30px #FFCFE1",
  "0 0 30px #FFE3CE", // pale orange
  "0 0 30px #EEFCBA",
  "0 0 30px #DDFFBA", // green
  "0 0 30px #FFB7C1",
  "0 0 50px #FFBAF5", // pink
  "0 0 30px #E2DFD4",
  "0 0 30px #C5FFBF", // green
  "0 0 30px #CBFDDF",
  "0 0 50px #D1FAFF", // light blue
  "0 0 30px #CAD4FF",
  "0 0 30px #D9BAFF", // purple
  "0 0 30px #CAD4FF",
  "0 0 30px #BAEBFF", // blue
  "0 0 50px #C6F3FF", // light blue 2
];
