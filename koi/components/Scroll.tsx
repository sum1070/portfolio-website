import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from 'motion/react'
import React from 'react'

const Scroll = () => {
    const { scrollY } = useScroll()
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress)

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Page scroll: ", latest)
    })

    const scale = useTransform(scrollY, [200, 1200], [0.5, 2])
    return (
        // <motion.div
        //     style={{
        //         scale,
        //         width: '300px',
        //         height: '200px',
        //         background: "blue",
        //         margin: "1500px auto",
        //         borderRadius: "20px",
        //     }}>
        //     Scroll
        // </motion.div>
        <motion.div style={{ scaleX }} />
    )
}

export default Scroll

