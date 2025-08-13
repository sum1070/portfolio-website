import React from 'react';
import { cn } from '@/utils';

interface CornerProps {
  isHovered?: boolean;
}

const Corner = ({ isHovered = false }: CornerProps) => {
  const corner = "absolute transition-all duration-300 border-indigo-500/20";
  const hoveredStyle = "w-[20px] h-[20px] border-[rgba(0,242,234,0.5)] ";

  return (
    <div className="corner-elements pointer-events-none">
      <span className={cn(
        "top-[10px] left-[10px] w-[15px] h-[15px] border-t-2 border-l-2 ",
        corner,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        "top-[10px] right-[10px] w-[15px] h-[15px] border-t-2 border-r-2 ",
        corner,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        "bottom-[10px] left-[10px] w-[15px] h-[15px] border-b-2 border-l-2 ",
        corner,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        "bottom-[10px] right-[10px] w-[15px] h-[15px] border-b-2 border-r-2 ",
        corner,
        isHovered && hoveredStyle
      )}></span>
    </div>
  );
};

export default Corner;