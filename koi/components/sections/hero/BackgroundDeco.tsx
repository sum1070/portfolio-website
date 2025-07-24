import { Bar, CodeTextSVG, Dot, LineCircle, Triangle } from "@/components/decorations";
import { motion, useScroll } from "framer-motion";
import { springY } from "@/lib/utils";

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
            <div className="-z-40 pointer-events-none absolute inset-0 overflow-hidden">
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
                        rotate="315deg"
                        className="mask-luminance mask-r-from-black mask-r-from-5% mask-r-to-white"
                    />
                </motion.div>
                <motion.div style={{ y: barY1, position: "absolute", left: "-5%", top: "80%" }}>
                    <Bar
                        width="220px"
                        length="15px"
                        color="var(--color-sky-blue)"
                        endColor="var(--color-pale-purple0)"
                        rotate="135deg" />
                </motion.div>
                <motion.div style={{ y: barY2, position: "absolute", left: "20%", top: "10%" }}>
                    <Bar
                        width="300px"
                        length="10px"
                        color="var(--color-Mauve)"
                        endColor="var(--color-sky-blue)"
                        rotate="135deg" />
                </motion.div>

                {/* Circle */}
                <motion.div
                    style={{
                        y: barY2,
                        position: "absolute",
                        left: "0%",
                        top: "84%"
                    }}>
                    <LineCircle size="200px" className="mx-auto absolute bottom-0 left-0" />
                </motion.div>

                {/* Triangle */}
                <motion.div style={{ y: triangleY }} className="absolute left-0 bottom-6/12">
                    <Triangle size="100px" image="big" rotate="330deg" />
                </motion.div>
                <motion.div style={{ y: triangleY }} className="absolute left-3/5 top-auto">
                    <Triangle size="150px" image="mid" />
                </motion.div>
                <motion.div style={{ y: triangleY }} className="absolute left-3/5 bottom-4/12">
                    <Triangle size="80px" image="big" rotate="120deg" className="mask-luminance mask-r-from-white mask-r-from-70% mask-r-to-black" />
                </motion.div>
                {/* Dots */}
                <Dot
                    size="36px"
                    type="hollow"
                    x="5%"
                    y="7%"
                    border={7}
                    color="var(--color-milky-white)" />
                <Dot
                    size="40px"
                    x="88%"
                    y="95%"
                    border={7}
                    blur={true}
                    color="var(--color-pale-purple0)" />
                <Dot
                    size="15px"
                    x="92%"
                    y="75%"
                    border={7}
                    color="var(--color-pale-purple0)" />
                {/* pink with purple shadow */}
                <Dot
                    size="38px"
                    x="9.8%"
                    y="18.9%"
                    blur={true}
                    color="var(--color-purple0)" />
                <Dot
                    size="36px"
                    x="10%"
                    y="19%"
                    border={7}
                    color="var(--color-pink2)" />
                {/* blue with pink shadow */}
                <Dot
                    size="42px"
                    x="79.8%"
                    y="65%"
                    blur={true}
                    color="var(--color-pink1)"
                    border={7} />
                <Dot
                    size="40px"
                    x="80%"
                    y="65%" />

            </div>
            <div className="z-10 absolute top-0 right-0">
                <CodeTextSVG />
            </div>
        </>
    );
};
