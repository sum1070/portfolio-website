'use client';

import { TextHoverEffect } from "@/components/ui/dev/text-hover-effect";
import Dummy from "./dummy";
import DevBackgroundHero from "@/components/sections/hero/dev_BackgroundHero";
import Scroll from "@/components/Scroll";
import Hero from "@/components/sections/Hero";

export function Test() {
    return (
        <>
            {/* <TextHoverEffect text={"nihao"}/>   */}
                  <Hero />
            
            <Dummy />
            <Dummy />
        </>
    );
}
