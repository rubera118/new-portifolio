import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6C63FF, #00BFA6)',
        boxShadow: '0 0 10px rgba(108,99,255,0.6)',
      }}
    />
  )
}
