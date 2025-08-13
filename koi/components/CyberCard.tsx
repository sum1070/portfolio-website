"use client";
import { cn } from '@/utils';
import React, { useState } from 'react';
import Corner from './dev/cyberCard/Corner';
import { TBaseProps } from '@/lib/types';

interface Props extends TBaseProps {
  cardCN?: string;
}

const CyberCard = ({
  className,
  cardCN = "",
}: Props) => {
  const cardTitle = "Margaret";
  const cardSize = "w-68 h-60";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="cyber-card-container w-full h-full">

      <div className={cn(
        "flex justify-center items-center p-4 font-fira-code cyber-glitch-wrapper ",
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

          <div id="avatar" className={cn(
            "absolute left-[20%] -translate-x-1/2 top-5 z-10 w-[5.5rem] h-[5.5rem] bg-black2 rounded-full p-0.5 drop-shadow-sky-200/15 drop-shadow-lg border transition-colors duration-500 overflow-hidden",
            isHovered ? "border-[rgba(0,242,234,0.8)]" : "border-bright-pink"
          )}>
            <img
              src="/images/painoko-15.jpg"
              alt='icon'
              className={cn(
                "w-full h-full object-cover rounded-full",
                isHovered ? "brightness-100" : "brightness-92"
              )}
            />
          </div>

          <div
            id='card-body'
            className="p-4 pt-8 bg-linear-45 from-[#1a1a1a] to-[#262626] flex flex-col grow items-center text-center"
          >
            <div className="mb-3">
              <div
                className={cn(
                  "cyber-profile-name",
                  "relative cursor-pointer text-3xl font-bold uppercase m-0 tracking-widest transition-all duration-300",
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
    </div>
  );
}

export default CyberCard;
