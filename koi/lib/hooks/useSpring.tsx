import { useTransform, useSpring, MotionValue } from "framer-motion";

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