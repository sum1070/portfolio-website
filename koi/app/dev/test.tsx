'use client';

import { TextHoverEffect } from "@/components/ui/dev/text-hover-effect";
import Dummy from "./dummy";
import DevBackgroundDeco from "@/components/sections/hero/dev_BackgroundDeco";
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
