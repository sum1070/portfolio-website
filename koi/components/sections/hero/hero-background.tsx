import { Bar, Dot, LineCircle, Triangle } from "@/components/decorations";
import { motion, useAnimate, useScroll } from "framer-motion";
import { useEffect } from "react";
import { FadeIn, Pattern, CodeTextSVG, bgPrimary } from "@/components";
import HeroHeader from "./hero-header";
import { springY } from "@/lib/hooks/useSpring";
import { animationTime, borderColor, boxShadow } from "@/utils";

export default function BackgroundHero() {
    const [scope, animate] = useAnimate();
    const { scrollY } = useScroll();

    const sprBar1 = springY(scrollY, [0, -115], [0, 500], { stiffness: 80, damping: 20 });
    const sprBar2 = springY(scrollY, [0, -150], [0, 500], { stiffness: 60, damping: 25 });
    const triangleY = springY(scrollY, [0, -180], [0, 500], { stiffness: 90, damping: 20 });
    const spr5 = springY(scrollY, [0, -220], [0, 500], { stiffness: 80, damping: 10 });
    const sprStiff = springY(scrollY, [0, -90], [0, 500], { stiffness: 120, damping: 15 });
    const sprNormal = springY(scrollY, [0, -200], [0, 500], { stiffness: 90, damping: 20 });
    const sprFlex = springY(scrollY, [0, -280], [0, 500], { stiffness: 70, damping: 10 });
    const sprFlex2 = springY(scrollY, [0, -250], [0, 500], { stiffness: 70, damping: 10 });
    const sprOrbit = springY(scrollY, [0, -120], [0, 500], { stiffness: 80, damping: 10 });
    const orbitScale = 1;

    const shapeClasses = "pointer-events-none absolute inset-0 overflow-hidden -z-10 ";

    useEffect(() => {
        const animateOrbit = async () => {
            await animate(scope.current, { opacity: 0, boxShadow: "none", border: "0px solid transparent" }, { duration: 0 });
            // fade in the orbit
            await animate(scope.current, {
                opacity: 1,
                border: "4px solid #86DDFF",
                boxShadow: "0 0 70px #86DDFF"
            }, {
                duration: animationTime.durationOrbitIntro,
                delay: animationTime.delayOrbitIntro,
                ease: "easeInOut"
            });
            // color change
            let index = 0;
            const cycleColors = async () => {
                await animate(scope.current, {
                    border: borderColor[index],
                    boxShadow: boxShadow[index]
                }, {
                    delay: animationTime.delayOrbitColor,
                    duration: animationTime.durationOrbitColor,
                    ease: "easeInOut"
                });

                index = (index + 1) % borderColor.length;
                cycleColors(); // recursive call
            };
            cycleColors();
        };
        animateOrbit();
    }, [animate]);

    return (
        <>
            {/* Background */}
            {bgPrimary()}
            <FadeIn className="absolute inset-x-0 bottom-0">
                <div className="absolute bottom-0 left-0 w-full py-8 bg-gradient-to-t from-milky-white to-transparent"></div>
                {/* white dots grid */}
                <Pattern
                    type="dots"
                    className="w-full h-[10svh] sm:h-[10svh] md:h-[15svh] z-40"
                    position="bottom"
                    color="#fefaf3"
                    width="100%"
                    spacing={13}
                    stroke={3}
                />
                <Pattern
                    type="dots"
                    position="bottom-right"
                    color="#fefaf3"
                    spacing={13}
                    stroke={3}
                    className="z-40 bottom-[10svh] h-2/5 sm:bottom-[10svh] md:bottom-[15svh] sm:w-[10svw] "
                />
            </FadeIn>
            {/* Bar */}
            <FadeIn duration={animationTime.durationBars} delayOffset={1.5} className={`${shapeClasses}`} >
                {/* Bars */}
                <div >
                    {/* Hollow bar (bigger screen)*/}
                    <motion.div style={{ y: sprBar2, position: "absolute" }} className="top-40 left-0 hidden md:block">
                        <Bar width="300px" type="hollow" borderWidth="3px" length="70px" rotate="135deg" />
                    </motion.div>
                    {/* Hollow bar (small screen) */}
                    <motion.div style={{ y: sprBar2, position: "absolute" }} className="top-10 left-0 md:hidden ">
                        <Bar width="60dvw" type="hollow" borderWidth="1dvw" length="10dvh" rotate="135deg" />
                    </motion.div>
                    {/* fat bar */}
                    <motion.div style={{ y: sprBar1, position: "absolute", left: "70%", top: "80%" }}>
                        <Bar width="500px" length="80px" rotate="135deg" />
                    </motion.div>
                    <motion.div className="hidden md:block" style={{ y: sprBar2, position: "absolute", left: "4%", top: "90%" }}>
                        <Bar width="400px" length="15px" color="var(--color-sky-blue)" endColor="var(--color-pale-purple0)" rotate="315deg" className="mask-luminance mask-r-from-black mask-r-from-5% mask-r-to-white" />
                    </motion.div>
                    <motion.div className="hidden md:block" style={{ y: sprBar1, position: "absolute", left: "-5%", top: "80%" }}>
                        <Bar width="220px" length="15px" color="var(--color-sky-blue)" endColor="var(--color-pale-purple0)" rotate="135deg" />
                    </motion.div>
                    <motion.div className="hidden md:block" style={{ y: sprBar2, position: "absolute", left: "20%", top: "10%" }}>
                        <Bar width="300px" length="10px" color="var(--color-Mauve)" endColor="var(--color-sky-blue)" rotate="135deg" />
                    </motion.div>
                </div>
            </FadeIn>
            {/* X */}
            <FadeIn yTranslation={true} duration={animationTime.durationBars} delayOffset={0.8} className={`${shapeClasses}`}>
                <motion.div className="hidden md:block" style={{ y: sprFlex2, position: "absolute", left: "18%", bottom: "56%" }}>
                    <Bar width="60px" length="10px" rotate="145deg  " />
                    <Bar width="60px" length="10px" rotate="55deg  " />
                </motion.div>
                <motion.div style={{ y: sprFlex2, position: "absolute", right: "18%", bottom: "24%" }}>
                    <Bar width="50px" length="10px" rotate="25deg" color="var(--color-pink3)" endColor="var(--color-pale-purple1)" />
                    <Bar width="50px" length="10px" rotate="115deg" color="var(--color-pink0)" endColor="var(--color-pink3)" />
                </motion.div>
                <motion.div style={{ y: sprNormal, position: "absolute", right: "80%", bottom: "32%" }}>
                    <Bar width="20px" length="3px" rotate="25deg" color="var(--color-pink3)" endColor="var(--color-pale-purple1)" />
                    <Bar width="20px" length="3px" rotate="115deg" color="var(--color-pink0)" endColor="var(--color-pink3)" />
                </motion.div>
                <motion.div style={{ y: sprFlex, position: "absolute", right: "24%", bottom: "60%" }}>
                    <Bar width="30px" length="10px" rotate="50deg" color="var(--color-blue2)" endColor="var(--color-pale-purple1)" />
                    <Bar width="30px" length="10px" rotate="140deg" color="var(--color-pale-purple1)" endColor="var(--color-blue2)" />
                </motion.div>
            </FadeIn>
            {/* Dots */}
            <FadeIn yTranslation={true} duration={animationTime.durationDots} delayOffset={0.8} className={`${shapeClasses}`} >
                <div className="opacity-70 sm:opacity-100">
                    {/* Hollow dot small r */}
                    <motion.div style={{ y: sprStiff, position: "absolute", right: "25%", top: "47%" }}>
                        <Dot size="15px" type="hollow" border={2} color="var(--color-sky-blue)" />
                    </motion.div>
                    {/* Hollow dot bigger tl */}
                    <motion.div style={{ y: sprNormal, position: "absolute", left: "5%", top: "7%" }}>
                        <Dot size="36px" type="hollow" border={7} color="var(--color-milky-white)" />
                    </motion.div>
                    {/* Glowing pink dot bl */}
                    <motion.div style={{ y: sprFlex, position: "absolute", left: "25%", bottom: "27%" }}>
                        <Dot size="10px" border={2} color="var(--color-pink2)" blur={true} />
                    </motion.div>
                    {/* Glowing white dot bl */}
                    <motion.div style={{ y: sprNormal, position: "absolute", left: "10%", bottom: "35%" }}>
                        <Dot size="20px" border={7} blur={true} color="var(--color-pale-purple0)" />
                    </motion.div>
                    {/* Hyper white dot owo big screen only*/}
                    <motion.div className="hidden md:block" style={{ y: sprFlex, position: "absolute", left: "92%", top: "75%" }}>
                        <Dot size="15px" border={7} color="var(--color-pale-purple0)" />
                    </motion.div>
                    {/* pink with purple shadow (big screen) */}
                    <div className="hidden md:block" >
                        <motion.div style={{ y: sprStiff, position: "absolute", left: "9.8%", top: "18.9%" }}>
                            <Dot size="38px" blur={true} color="var(--color-purple0)" />
                        </motion.div>
                        <motion.div style={{ y: sprStiff, position: "absolute", left: "10%", top: "19%" }}>
                            <Dot size="36px" border={7} color="var(--color-pink0)" />
                        </motion.div>
                    </div>
                    {/* pink with purple shadow (small screen) */}
                    <div className="md:hidden" >
                        <motion.div style={{ y: sprStiff, position: "absolute", left: "9.8%", top: "22.9%" }}>
                            <Dot size="30px" blur={true} color="var(--color-purple0)" />
                        </motion.div>
                        <motion.div style={{ y: sprStiff, position: "absolute", left: "10.5%", top: "23%" }}>
                            <Dot size="26px" blur={true} color="var(--color-pink0)" />
                        </motion.div>
                    </div>
                    {/* blue big dots (big screen) */}
                    <div className="hidden md:block">
                        <motion.div style={{ y: sprNormal, position: "absolute", left: "79.8%", top: "65%" }}>
                            <Dot size="42px" blur={true} color="var(--color-pink1)  border={7} " />
                        </motion.div>
                        <motion.div style={{ y: sprNormal, position: "absolute", left: "80%", top: "65%" }}>
                            <Dot size="39px" blur={true} color="var(--color-milky-white)" />
                        </motion.div>
                        <motion.div style={{ y: sprNormal, position: "absolute", left: "80%", top: "65%" }}>
                            <Dot size="38px" blur={true} />
                        </motion.div>
                    </div>
                </div>
            </FadeIn>
            {/* code text */}
            <FadeIn yTranslation={true} delayOffset={1} className="z-10 absolute top-0 right-0">
                <CodeTextSVG />
                {/* <CodeText /> */}
            </FadeIn>
            {/* SVG */}
            <FadeIn yTranslation={true} className={`${shapeClasses}`} >
                <div >
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
                </div>
            </FadeIn>
            {/* SVG (big screen only)*/}
            <FadeIn yTranslation={true} className={`${shapeClasses}, hidden md:block`} >
                <div >
                    <motion.div
                        style={{
                            y: spr5,
                            position: "absolute",
                            left: "0%",
                            bottom: "24%",
                            translateZ: 0
                        }}>
                        <LineCircle size="200px" className="mx-auto " />
                    </motion.div>
                    <motion.div
                        style={{
                            y: spr5,
                            position: "absolute",
                            right: "20%",
                            bottom: "84%",
                            translateZ: 0
                        }}>
                        <LineCircle size="90px" className="mx-auto absolute " />
                    </motion.div>
                </div>
            </FadeIn>
            {/* Centre orbit */}
            <motion.div
                ref={scope}
                className="z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  "
                style={{
                    position: "absolute",
                    y: sprOrbit,
                    scale: orbitScale,
                    rotate: -30,
                    borderRadius: "50%",
                    border: "0px solid transparent",
                    boxShadow: "none"
                }}
                initial={{ opacity: 0, border: "0px solid transparent", boxShadow: "none" }}
            >
                <div className="w-[288px] h-[108px]  sm:w-[480px] sm:h-[180px] md:w-[800px] md:h-[300px] xl:w-[960px] xl:h-[360px]" />
            </motion.div>


        </>


    );
};


