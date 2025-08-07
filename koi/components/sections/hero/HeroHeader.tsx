"use client";
import { positionClasses } from '@/lib/types';
import { cn, soundButtonImages } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { useVolume } from '@/lib/context/VolumeContext';

const HeroHeader = () => {
  const { isMuted, toggleMute } = useVolume();

  return (
    <div className={cn(
      "absolute ",
      "w-full",
      "rounded-b-lg"
    )}>
      <Image
        src={!isMuted ? soundButtonImages.soundOn : soundButtonImages.soundOff}
        alt="sound button"
        width={100}
        height={100}
        onClick={toggleMute}
        className={cn(
          positionClasses['top-left'],
          "w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10",
          "cursor-pointer",
          "transition-transform hover:scale-110",
          "mt-5 ml-5"
        )}
      />
    </div>
  )
}

export default HeroHeader