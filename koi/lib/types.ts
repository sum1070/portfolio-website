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
}

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

type TPatternStyle = "dots" | "grid";
export type TPattern = TUIComponent & {
  type: TPatternStyle;
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

export type TButton =
  | "contact"
  | "wip"
  | "projects"
  | "github"
  | "certificates"
  ;

export type VolumeContextType = {
  volume: number;
  isMuted: boolean;
  toggleMute: () => void;
  setNewVolume: (volume: number) => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
};
export interface CursorProps {
  cursorChar?: string;
  blinkSpeed?: number;
  blinkEnabled?: boolean;
}
interface TextSequence {
  text: string;
  deleteCount?: number; // number of characters to delete (0 = delete all)
  pauseBeforeDelete?: number; // pause before deleting (ms)
  pauseAfterDelete?: number; // pause after deleting (ms)
}
export interface TypewriterProps extends TAnimation {
  onComplete?: () => void; // typing + deletion completed
  onTypeComplete?: (text: string) => void; // typing completed
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
  enableDelete?: boolean; // enable text deletion
  deleteSpeed?: number;
  sequences?: TextSequence[];
  loop?: boolean;
}

