import { Bar, CodeTextSVG, Dot, LineCircle, Triangle } from "@/components/decorations";
import { motion, useAnimate, useScroll } from "framer-motion";
import { borderColor, boxShadow, springY } from "@/lib/utils";
import { useEffect } from "react";
import { Pattern } from "@/components";
import FadeIn from "@/lib/FadeIn";
import { animationTime } from "@/lib/utils";
import Wave from "react-wavify";

export default function BackgroundHero() {
    return (
        <>

            <div
                className="absolute inset-0 -z-50 bg-pale-purple1"
                // style={{
                //     background: `
                //         radial-gradient(at 95% 75%, var(--color-pink1) 0%, transparent 50%),
                //         radial-gradient(at 6% 48%, var(--color-purple1) 0%, transparent 80%),
                //         radial-gradient(at 26% 5%, var(--color-milky-white) 0%, transparent 80%),
                //         radial-gradient(at 92% 27%, var(--color-sky-blue) 0%, transparent 40%),
                //         radial-gradient(at 52% 100%, var(--color-sky-blue) 0%, transparent 50%),
                //         radial-gradient(at 9% 88%, var(--color-pale-purple2) 0%, transparent 20%)
                //         `,
                //     backgroundColor: "var(--color-pale-purple0)",
                //     backgroundRepeat: "no-repeat",
                //     backgroundSize: "cover",
                //     backgroundAttachment: "fixed",
                // }}
            >


            </div>

            {/* <div></div> */}





        </>


    );
};

