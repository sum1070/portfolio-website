"use client";
import { cn } from "@/utils";
import { DogGuide, ThemeToggle, TrailPicker, VolumeControl } from "@/components";

const HeroHeader = () => {
  return (
    <div className={cn("absolute", "w-full px-4", "rounded-b-lg", "z-50")}>
      <div className="flex items-center justify-between mt-5">
        <div className="ml-5">
          <VolumeControl />
        </div>
        <div className="mr-5 flex items-center gap-4">
          <TrailPicker />
          <DogGuide />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
