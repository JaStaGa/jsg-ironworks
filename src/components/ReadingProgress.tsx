"use client"
import { motion, useScroll } from "framer-motion"

export default function ReadingProgress() {
    const { scrollYProgress } = useScroll()
    return (
        <motion.div
            className="fixed left-0 top-0 z-40 h-0.5 bg-safety origin-left"
            style={{ scaleX: scrollYProgress }}
            aria-hidden
        />
    )
}
