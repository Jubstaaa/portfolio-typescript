"use client";

import { motion } from "framer-motion";
import { ReactElement } from "react";


export default function Template({ children }: { children: ReactElement }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        rotateX: 5,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
