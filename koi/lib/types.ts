import { delay } from "motion";

export type TContainerProps = {
  className?: string; // for tailwind styling
  children: React.ReactNode; // My son to be rendered
  style?: React.CSSProperties; // for inline styles
};

interface TUIComponent {
  className?: string;
  sizeClassName?: string;
  width?: string;
  length?: string;
  size?: string;
  position?: TPosition;
  color?: string;
  endColor?: string;
};

export type TShape = TUIComponent & {
  rotate?: string;
  opacity?: number;
  border?: number;
  x?: string;
  y?: string;
  blur?: boolean;
};

type TPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "full";

export const positionClasses = {
  top: "top-0 left-1/2 -translate-x-1/2",
  bottom: "absolute inset-x-0 bottom-0",
  left: "left-0 top-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 -translate-y-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  full: "inset-0",
};

type PatternType = "dots" | "grid";
export type TPattern = TUIComponent & {
  type: PatternType;
  spacing?: number; // spacing between dots / grid lines
  mask?: boolean;
  opacity?: number;
  stroke?: number;
};

export type TAnimation = {
  className?: string;
  text?: string;
  duration?: number;
  delay?: number;
  speed?: number;
  children?: React.ReactNode; // <T> children </T>
};