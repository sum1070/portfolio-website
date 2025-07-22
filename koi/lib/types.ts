export type TShape = {
  className?: string;
  color?: string;
  endColor?: string;
  width?: string;
  length?: string;
  size?: string;
  rotate?: string;
  opacity?: number;
  border?: number;
  x?: string;
  y?: string;
  blur?: boolean;
};

export type TContainerProps = {
  className?: string; // for tailwind styling
  children: React.ReactNode; // My son to be rendered
  style?: React.CSSProperties; // for inline styles
};

export type TAnimation = {
  className?: string;
  text?: string;
  duration?: number;
  delay?: number;
  speed?: number;
  children?: React.ReactNode; // <T> children </T>
};

type Position =
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
  bottom: "bottom-0 left-1/2 -translate-x-1/2",
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
export type PatternProps = {
  className?: string;
  type: PatternType;
  size?: number; // spacing
  mask?: boolean;
  width?: string;
  height?: string;
  position?: Position;
  zIndex?: string;
  color?: string;

};

