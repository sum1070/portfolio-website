import React from 'react';
import { cn } from '@/utils';

const CyberCardCorner = ({ isHovered = false }) => {
  const corner = "absolute transition-all duration-300 border-indigo-500/20";
  const hoveredStyle = "w-[20px] h-[20px] border-cyan-400/50";
  const positionValue = "10px";
  const sizeValue = "15px";
  const pos = {
    topLeft: `top-[${positionValue}] left-[${positionValue}] w-[${sizeValue}] h-[${sizeValue}] border-t-2 border-l-2`,
    topRight: `top-[${positionValue}] right-[${positionValue}] w-[${sizeValue}] h-[${sizeValue}] border-t-2 border-r-2`,
    bottomLeft: `bottom-[${positionValue}] left-[${positionValue}] w-[${sizeValue}] h-[${sizeValue}] border-b-2 border-l-2`,
    bottomRight: `bottom-[${positionValue}] right-[${positionValue}] w-[${sizeValue}] h-[${sizeValue}] border-b-2 border-r-2`,
  };

  return (
    <div className="corner-elements pointer-events-none">
      <span className={cn(
        corner, pos.topLeft,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        corner, pos.topRight,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        corner,
        pos.bottomLeft,
        isHovered && hoveredStyle
      )}></span>
      <span className={cn(
        corner,
        pos.bottomRight,
        isHovered && hoveredStyle
      )}></span>
    </div>
  );
};
export default CyberCardCorner;
