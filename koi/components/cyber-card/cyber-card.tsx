"use client";
import { cn } from '@/utils';
import React, { useState } from 'react';
import Corner from './corner';
import { TBaseProps } from '@/lib/types';
import Avatar from './avatar';

interface Props extends TBaseProps {
  cardCN?: string;
  titleSize?: string;
}

const CyberCard = ({
  cardCN = "",
  titleSize = "",
}: Props) => {
  const cardTitle = "Margaret Chan";
  const cardSize = "w-68 h-60 xl:w-80 xl:h-80";
  const titleDefaultSize = "text-2xl xl:text-3xl";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn(
      "flex justify-center items-center w-full h-full font-titillium-web cyber-glitch-wrapper ",
    )}>

      <button
        className={cn(
          "relative bg-[#9dceee] rounded-2xl border border-[hsla(178,100%,47%,0)] shadow-[0_0_1.5rem_rgba(0,242,234,0.1),inset_0_0_1rem_rgba(0,0,0,0.5)] overflow-hidden flex flex-col",
          cardCN || cardSize,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div id='scan' className="z-20 absolute inset-0 opacity-20 animate-scanMove" />

        <Corner isHovered={isHovered} />

        <div
          id='card-glare'
          className={cn(
            "card-glare absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent",
            "transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />

        <div id='banner' className={cn(
          "h-20 bg-gradient-to-tr from-[#0061f21a] to-[#0d0d0da8] ",
          "border-b border-black2",
        )} />
        <Avatar isHovered={isHovered} />


        <div
          id='card-body'
          className="p-4 pt-8 bg-linear-45 from-[#1a1a1a] to-[#262626] flex flex-col grow items-center text-center"
        >
          <div className="mb-3">
            <div
              className={cn(
                "relative cursor-pointer font-bold uppercase mt-2 tracking-widest transition-all duration-300",
                titleSize || titleDefaultSize,
                isHovered
                  ? "bg-gradient-to-r from-[#00ffaa] to-[#00a2ff] bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(92,103,255,0.5)]"
                  : "text-milky-white/90"
              )}
              style={{
                textShadow: isHovered ? '0 0 10px rgba(92,103,255,0.5), 0 0 20px rgba(92,103,255,0.3)' : 'none'
              }}
            >
              {cardTitle}
            </div>
            <p className="opacity-80 text-bright-pink m-1 tracking-widest">
              うへへ
            </p>
          </div>
        </div>

      </button>
    </div>
  );
}

export default CyberCard;
