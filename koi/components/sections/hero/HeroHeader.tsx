"use client";
import { cn, soundButtonImages } from '@/lib/utils';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useVolume } from '@/lib/context/VolumeContext';

const HeroHeader = () => {
  const { isMuted, toggleMute, volume, incrementVolume, decrementVolume } = useVolume();

  const handleToggleMute = () => {
    toggleMute();
  };

  const handleIncrement = () => {
    incrementVolume();
  };

  const handleDecrement = () => {
    decrementVolume();
  };

  const buttonClassName = "min-w-8 md:min-w-8 p-1 bg-black/20 text-white rounded hover:bg-black/40"

  return (
    <div className={cn(
      "absolute",
      "w-full",
      "rounded-b-lg",
      "z-50"
    )}>
      <div className="flex items-center gap-2 mt-5 ml-5">
        <button
          onClick={handleToggleMute}
          className="bg-transparent p-0 border-0 flex items-center justify-center"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <Image
            src={!isMuted ? soundButtonImages.soundOn : soundButtonImages.soundOff}
            alt="sound button"
            width={100}
            height={100}
            className={cn(
              "w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10",
              "cursor-pointer",
              "transition-transform hover:scale-110"
            )}
          />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className={cn(`${buttonClassName}`)}
            aria-label="Decrease volume"
          >
            -
          </button>
          <span className="text-white font-titillium-web text-xl px-1 min-w-[40px] text-center">
            {Math.round(volume * 100)}%
          </span>
          <button
            onClick={handleIncrement}
            className={cn(`${buttonClassName}`)}
            aria-label="Increase volume"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader