import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTransform, useSpring, MotionValue } from "framer-motion";

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
  const {
    stiffness = 70,
    damping = 20,
    mass = 1.2,
  } = config;

  const transformed = useTransform(scrollY, inputRange, outputRange);

  return useSpring(transformed, { stiffness, damping, mass });
}