import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  special?: boolean;
}

function CyberButton({
  children,
  className,
  special = false,
  onClick,
  ...props
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
    if (onClick) onClick(e);
    setTimeout(() => setIsActive(false), 750);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group relative w-60 h-14 px-6 py-2 font-mono text-lg text-[#6c669c] tracking-wider',
        'bg-gradient-to-br from-[#e4d2ff] to-[#d4b9ff] text-left',
        'transition-transform duration-200 hover:scale-105',
        'shadow-lg border border-[#a089e4] outline-none',
        'clip-path-[polygon(0%_0%,95%_0%,100%_50%,95%_100%,0%_100%,5%_50%)]',
        'hover:bg-gradient-to-br hover:from-[#efdbff] hover:to-[#d3b4ff]',
        className
      )}
      {...props}
    >
      {/* Special tag */}
      {special && (
        <span className="absolute -top-2 -right-3 bg-[#3b3963] text-white text-xs px-2 py-[1px] rounded-md z-20">
          Special
        </span>
      )}

      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-[inherit] opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent)]"></div>
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default CyberButton;
