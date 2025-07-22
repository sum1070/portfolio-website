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
  children: React.ReactNode; // My son to be rendered
  className?: string; // for tailwind styling
  style?: React.CSSProperties; // for inline styles
};

export type TAnimation = {
  text?: string;
  className?: string;
  duration?: number;
  speed?: number;
  children?: React.ReactNode; // <T> children </T>
};
