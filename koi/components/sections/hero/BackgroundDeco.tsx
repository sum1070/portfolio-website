import { Bar, CodeTextSVG, Dot, LineCircle, Triangle } from "@/components/decorations";
import { animate, motion, useMotionTemplate, useMotionValue, useScroll } from "framer-motion";
import { springY } from "@/lib/utils";

export default function BackgroundDeco() {
    const { scrollY } = useScroll();

    const barY1 = springY(scrollY, [0, -75], [0, 500], { stiffness: 100, damping: 30 });
    const barY2 = springY(scrollY, [0, -150], [0, 500], { stiffness: 100, damping: 25 });
    const triangleY = springY(scrollY, [0, -180], [0, 500], { stiffness: 90, damping: 20 });
    const dotY1 = springY(scrollY, [0, -90], [0, 500], { stiffness: 120, damping: 15 });
    const circleY1 = springY(scrollY, [0, -220], [0, 500], { stiffness: 80, damping: 10 });
    const dotY3 = springY(scrollY, [0, -200], [0, 500], { stiffness: 70, damping: 10 });
    const dotY4 = springY(scrollY, [0, -200], [0, 500], { stiffness: 90, damping: 20 });
    
    const orbitY = springY(scrollY, [0, -100], [0, 500], { stiffness: 80, damping: 10 });
    const orbitScale = 1;

    return (
        <>
            <div className="-z-40 pointer-events-none absolute inset-0 overflow-hidden">
                {/* Bar */}
                <motion.div style={{ y: barY1, position: "absolute", left: "70%", top: "80%" }}>
                    <Bar width="500px" length="80px" rotate="135deg" />
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
                        y: circleY1,
                        position: "absolute",
                        left: "0%",
                        bottom: "24%"
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
                <motion.div style={{ y: dotY1, position: "absolute", left: "5%", top: "7%" }}>
                    <Dot size="36px" type="hollow" border={7} color="var(--color-milky-white)" />
                </motion.div>
                <motion.div style={{ y: dotY4, position: "absolute", left: "10%", bottom: "35%" }}>
                    <Dot
                        size="20px"
                        border={7}
                        blur={true}
                        color="var(--color-pale-purple0)"
                    />
                </motion.div>
                <motion.div style={{ y: dotY3, position: "absolute", left: "92%", top: "75%" }}>
                    <Dot size="15px" border={7} color="var(--color-pale-purple0)" />
                </motion.div>
                {/* pink with purple shadow */}
                <motion.div style={{ y: dotY1, position: "absolute", left: "9.8%", top: "18.9%" }}>
                    <Dot size="38px" blur={true} color="var(--color-purple0)" />
                </motion.div>
                <motion.div style={{ y: dotY1, position: "absolute", left: "10%", top: "19%" }}>
                    <Dot size="36px" border={7} color="var(--color-pink2)" />
                </motion.div>


                {/* blue with pink shadow */}
                <motion.div style={{ y: dotY4, position: "absolute", left: "79.8%", top: "65%" }}>
                    <Dot
                        size="42px"
                        blur={true}
                        color="var(--color-pink1)"
                        border={7} />
                </motion.div>
                <motion.div style={{ y: dotY4, position: "absolute", left: "80%", top: "65%" }}>
                    <Dot size="38px" blur={true} />
                </motion.div>

            </div>
            <div className="z-10 absolute top-0 right-0">
                <CodeTextSVG />
            </div>
            {/* Centre orbit */}
            <motion.div
                className="-z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    position: "absolute",
                    y: orbitY,
                    scale: orbitScale,
                    rotate: -30,
                    borderRadius: "50%"
                }}
                initial={{
                    opacity: 1,
                    border: "4px solid var(--color-sky-blue)",
                    boxShadow: "0 0 30px var(--color-sky-blue)"
                }}
                animate={{
                    opacity: 1,
                    border: borderColor,
                    boxShadow: boxShadow,
                }}
                transition={{
                    delay: 0.5,
                    duration: 32,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            >
                <div className="w-[320px] h-[120px] sm:w-[480px] sm:h-[180px] md:w-[800px] md:h-[300px] xl:w-[960px] xl:h-[360px]" />
            </motion.div>
        </>
    );
};

const borderColor = [
    "4px solid #BAEBFF", // blue
    "4px solid #CAD4FF", 
    "4px solid #D9BAFF", // purple
    "4px solid #ECBEF4", 
    "4px solid #FFBAF5", // pink
    "4px solid #FEDED7", 
    "2px solid #FFF8BA", // yellow
    "4px solid #FED6AE",
    "4px solid #D9BAFF", // purple
    "4px solid #FFB7C1",
    "4px solid #FFBAF5", // pink
    "4px solid #E2DFD4",
    "4px solid #C5FFBF", // green
    "4px solid #CBFDDF",
    "4px solid #D1FAFF", // light blue
    "4px solid #CAD4FF",
    "4px solid #D9BAFF", // purple
    "4px solid #CAD4FF",
    "4px solid #BAEBFF", // blue
    "4px solid #C6F3FF", // light blue 2
]

const boxShadow = [
    "0 0 50px #BAEBFF", // blue
    "0 0 30px #CAD4FF", 
    "0 0 30px #D9BAFF", // purple
    "0 0 30px #ECBEF4", 
    "0 0 50px #FFBAF5", // pink
    "0 0 30px #FEDED7", 
    "0 0 30px #FFF8BA", // yellow
    "0 0 30px #FED6AE",
    "0 0 30px #D9BAFF", // purple
    "0 0 30px #FFB7C1",
    "0 0 50px #FFBAF5", // pink
    "0 0 30px #E2DFD4",
    "0 0 30px #C5FFBF", // green
    "0 0 30px #CBFDDF",
    "0 0 50px #D1FAFF", // light blue
    "0 0 30px #CAD4FF",
    "0 0 30px #D9BAFF", // purple
    "0 0 30px #CAD4FF",
    "0 0 30px #BAEBFF", // blue
    "0 0 50px #C6F3FF", // light blue 2
]