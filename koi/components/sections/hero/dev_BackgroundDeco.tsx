"use client";

import { motion, useScroll } from "framer-motion";
import { springY } from "@/lib/utils";
import { Bar, CodeTextSVG, Dot, Triangle } from "@/components/decorations";

export default function BackgroundDeco() {
  const { scrollY } = useScroll();

  const barY1 = springY(scrollY, [0, -75], [0, 500], { stiffness: 100, damping: 30 });
  const barY2 = springY(scrollY, [0, -150], [0, 500], { stiffness: 100, damping: 25 });
  const triangleY = springY(scrollY, [0, -180], [0, 500], { stiffness: 90, damping: 20 });
  const dotY1 = springY(scrollY, [0, -90], [0, 500], { stiffness: 120, damping: 15 });
  const dotY2 = springY(scrollY, [0, -120], [0, 500], { stiffness: 80, damping: 20 });
  const dotY3 = springY(scrollY, [0, -200], [0, 500], { stiffness: 70, damping: 10 });
  const codeTextY = springY(scrollY, [0, -180], [0, 500], { stiffness: 80, damping: 20 });

  return (
    <>
      <div className="-z-10 pointer-events-none absolute inset-0">
        {/* Bar */}
        <motion.div style={{ y: barY1, position: "absolute", left: "70%", top: "80%" }}>
          <Bar width="500px" length="80px" x="0" y="0" rotate="135deg" />
        </motion.div>

        <motion.div style={{ y: barY2, position: "absolute", left: "4%", top: "90%" }}>
          <Bar
            width="400px"
            length="15px"
            color="var(--color-sky-blue)"
            endColor="var(--color-pale-purple0)"
            x="0"
            y="0"
            rotate="315deg"
          />
        </motion.div>

        {/* Triangle */}
        <motion.div style={{ y: triangleY }} className="absolute right-11/12 bottom-4/12">
          <Triangle size="100px" image="big" rotate="330deg" />
        </motion.div>

        {/* Dots */}
        <motion.div style={{ y: dotY1, position: "absolute", left: "5%", top: "7%" }}>
          <Dot size="36px" type="hollow" x="0" y="0" border={7} color="var(--color-milky-white)" />
        </motion.div>

        <motion.div style={{ y: dotY2, position: "absolute", left: "88%", top: "95%" }}>
          <Dot
            size="40px"
            x="0"
            y="0"
            border={7}
            blur={true}
            color="var(--color-pale-purple0)"
          />
        </motion.div>

        <motion.div style={{ y: dotY3, position: "absolute", left: "92%", top: "75%" }}>
          <Dot size="15px" x="0" y="0" border={7} color="var(--color-pale-purple0)" />
        </motion.div>

        {/* pink with purple shadow */}
        <motion.div style={{ y: dotY1, position: "absolute", left: "9.8%", top: "18.9%" }}>
          <Dot size="38px" x="0" y="0" blur={true} color="var(--color-purple0)" />
        </motion.div>

        <motion.div style={{ y: dotY1, position: "absolute", left: "10%", top: "19%" }}>
          <Dot size="36px" x="0" y="0" border={7} color="var(--color-pink2)" />
        </motion.div>

        {/* blue with pink shadow */}
        <motion.div style={{ y: dotY2, position: "absolute", left: "79.8%", top: "65%" }}>
          <Dot size="42px" x="0" y="0" blur={true} color="var(--color-pink1)" border={7} />
        </motion.div>

        <motion.div style={{ y: dotY2, position: "absolute", left: "80%", top: "65%" }}>
          <Dot size="40px" x="0" y="0" />
        </motion.div>
      </div>

      <motion.div className="z-10 absolute top-0 right-0" style={{ y: codeTextY }}>
        <CodeTextSVG />
      </motion.div>
    </>
  );
}
