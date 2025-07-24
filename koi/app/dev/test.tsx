'use client';

import { TextHoverEffect } from "@/components/ui/dev/text-hover-effect";
import Dummy from "./dummy";
import DevBackgroundDeco from "@/components/sections/hero/dev_BackgroundDeco";
import Scroll from "@/components/Scroll";

export function Test() {
    return (
        <>
            <Scroll />
            <div className="p-150"> </div>
            {/* <TextHoverEffect text={"nihao"}/>   */}
            <Dummy />
            <DevBackgroundDeco />
            <Dummy />
            <Dummy />
        </>
    );
}
