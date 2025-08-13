import React from 'react';
import { cn } from '@/utils';

interface CornerProps {
  isHovered?: boolean;
}

const Corner: React.FC<CornerProps> = ({ isHovered = false }) => {
  return (
    <div className="corner-elements pointer-events-none">
      <span className={cn(
        "absolute top-[10px] left-[10px] w-[15px] h-[15px] border-t-2 border-l-2 border-[rgba(92,103,255,0.3)]",
        "transition-all duration-300",
        isHovered && "w-[20px] h-[20px] border-[rgba(0,242,234,0.5)]"
      )}></span>
      <span className={cn(
        "absolute top-[10px] right-[10px] w-[15px] h-[15px] border-t-2 border-r-2 border-[rgba(92,103,255,0.3)]",
        "transition-all duration-300",
        isHovered && "w-[20px] h-[20px] border-[rgba(0,242,234,0.5)]"
      )}></span>
      <span className={cn(
        "absolute bottom-[10px] left-[10px] w-[15px] h-[15px] border-b-2 border-l-2 border-[rgba(92,103,255,0.3)]",
        "transition-all duration-300",
        isHovered && "w-[20px] h-[20px] border-[rgba(0,242,234,0.5)]"
      )}></span>
      <span className={cn(
        "absolute bottom-[10px] right-[10px] w-[15px] h-[15px] border-b-2 border-r-2 border-[rgba(92,103,255,0.3)]",
        "transition-all duration-300",
        isHovered && "w-[20px] h-[20px] border-[rgba(0,242,234,0.5)]"
      )}></span>
    </div>
  );
};

export default Corner;