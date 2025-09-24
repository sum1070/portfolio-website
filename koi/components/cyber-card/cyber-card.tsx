"use client";
import { cn } from '@/utils';
import React, { useState } from 'react';
import Corner from './corner';
import { TBaseProps } from '@/lib/types';
import Avatar from './avatar';
import contactsJson from "@/data/data.json";

interface Props extends TBaseProps {
  cardCN?: string;
  titleSize?: string;
}

const CyberCard = ({
  cardCN = "",
  titleSize = "",
}: Props) => {
  const cardTitle = "Margaret Chan";
  const cardSize = "w-80 h-50 md:h-65 xl:w-90 xl:h-68";
  const titleDefaultSize = "text-2xl xl:text-3xl";
  const [isHovered, setIsHovered] = useState(false);

  // Get GitHub URL from contacts data
  const githubContact = contactsJson.contacts.find(contact => contact.name === "GitHub");
  const githubUrl = githubContact?.link || "https://github.com";

  const handleCardClick = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={cn(
      "flex justify-center items-center w-full h-full font-titillium-web cyber-glitch-wrapper select-none",
    )}>

      <button
        onClick={handleCardClick}
        className={cn(
          "relative bg-[#9dceee] rounded-2xl outline border border-[hsla(178,100%,47%,0)] shadow-[0_0_1.5rem_rgba(0,242,234,0.1),inset_0_0_1rem_rgba(0,0,0,0.5)] overflow-hidden flex flex-col",
          cardCN || cardSize,
          "cursor-pointer hover:shadow-[0_0_2rem_rgba(0,242,234,0.2),inset_0_0_1rem_rgba(0,0,0,0.5)]",
          "transition-shadow duration-300"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div id='scan' className="z-20 absolute inset-0 opacity-40 animate-scanMove" />

        <Corner isHovered={isHovered} />

        <div id='banner' className={cn(
          "h-18 bg-gradient-to-tr from-[#0061f21a] to-[#0d0d0da8] ",
          "border-b border-black2",
        )} />
        <Avatar isHovered={isHovered} />

        <div
          id='card-body'
          className=" p-4 pt-4 md:pt-10 bg-linear-45 from-[#0a0a0a] to-[#303030] flex flex-col grow items-center text-center"
        >
          <div>
            <div
              id='cyber-card-title'
              className={cn(
                "mt-4",
                "relative cursor-pointer font-bold uppercase tracking-widest transition-all duration-300",
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
            <p className="hidden md:block opacity-80 text-bright-pink m-1 tracking-widest">
              うへへ
            </p>
            <p className="opacity-80 text-milky-white m-1 tracking-widest">
              <span className='hidden md:block'>A Computer Science with Artificial Intelligence student</span>
              <span className='md:hidden'>A Comp Sci with AI student</span>
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default CyberCard;
