"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useVolume } from "@/lib/context/volume-context";
import { cn, soundButtonImages } from "@/utils";

interface VolumeControlProps {
  variant?: "hero" | "nav";
}

const VolumeControl = ({ variant = "hero" }: VolumeControlProps) => {
  const { isMuted, toggleMute, volume, incrementVolume, decrementVolume } =
    useVolume();

  useEffect(() => {
    if (volume === 0 && !isMuted) {
      toggleMute();
    }
  }, [volume, isMuted, toggleMute]);

  const isNav = variant === "nav";

  const buttonClassName = isNav
    ? "min-w-7 md:min-w-8 p-1.5 bg-purple-400/10 text-nice-purple2 rounded hover:bg-purple-400/25 dark:bg-white/10 dark:text-dark-text dark:hover:bg-white/25"
    : "min-w-8 md:min-w-10 p-2 bg-black/20 dark:bg-white/10 text-white rounded hover:bg-black/40 dark:hover:bg-white/40";
  const disabledButtonClassName = cn(
    buttonClassName,
    "opacity-32 cursor-not-allowed",
  );
  const textClassName = isNav
    ? "text-nice-purple2 dark:text-dark-text font-titillium-web text-lg px-1 min-w-[40px] text-center"
    : "text-white/80 font-titillium-web text-xl px-1 min-w-[40px] text-center";

  const isAtMinVolume = volume === 0;
  const isAtMaxVolume = volume === 1;

  return (
    <div id="volume-control" className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className={cn(
          "bg-transparent p-0 border-0 flex items-center justify-center",
        isNav && "bg-nice-purple1/70 dark:bg-transparent rounded-full p-1",
        )}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Image
          src={!isMuted ? soundButtonImages.soundOn : soundButtonImages.soundOff}
          alt="sound button"
          width={40}
          height={40}
          priority={true}
          className={cn(
            isNav ? "w-6 h-6 md:w-7 md:h-7" : "w-8 h-8 md:w-10 md:h-10",
            "cursor-pointer transition-transform hover:scale-110",
          )}
        />
      </button>
      <div className="ml-2 flex items-center gap-2">
        <button
          onClick={decrementVolume}
          className={cn(
            isAtMinVolume ? disabledButtonClassName : buttonClassName,
            "cursor-pointer",
          )}
          aria-label="Decrease volume"
          disabled={isAtMinVolume}
        >
          -
        </button>
        <span className={textClassName}>{Math.round(volume * 100)}%</span>
        <button
          onClick={incrementVolume}
          className={cn(
            isAtMaxVolume ? disabledButtonClassName : buttonClassName,
            "cursor-pointer",
          )}
          aria-label="Increase volume"
          disabled={isAtMaxVolume}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default VolumeControl;
