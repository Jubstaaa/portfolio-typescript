"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Icon } from "@iconify/react";

export default function RotatingBadge() {
  const innerControls = useAnimation();
  const middleControls = useAnimation();
  const outerControls = useAnimation();

  useEffect(() => {
    innerControls.start({
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 8,
      },
    });

    middleControls.start({
      rotate: [360, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 12,
      },
    });

    outerControls.start({
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 16,
      },
    });
  }, [innerControls, middleControls, outerControls]);

  return (
    <div className="relative w-full h-auto aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-2xl p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] opacity-10" />
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>{" "}
      <motion.div
        animate={outerControls}
        className="!transition-none absolute inset-0 flex items-center justify-center opacity-50"
      >
        <svg viewBox="0 0 200 200" className="w-[200%] h-[200%]">
          <defs>
            <path
              id="outerCirclePath"
              d="M 100, 100
                   m -85, 0
                   a 85,85 0 1,1 170,0
                   a 85,85 0 1,1 -170,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="40"
            fontWeight="bold"
            letterSpacing="1px"
          >
            <textPath href="#outerCirclePath" startOffset="0%">
              🚀 FULL-STACK DEVELOPMENT ✦ API INTEGRATIONS ✦ DATABASE MANAGEMENT
              ✦ CLOUD DEPLOYMENT 🚀
            </textPath>
          </text>
        </svg>
      </motion.div>
      <motion.div
        animate={middleControls}
        className="!transition-none absolute inset-0 flex items-center justify-center opacity-70"
      >
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5">
          <defs>
            <path
              id="middleCirclePath"
              d="M 80, 80
                   m -60, 0
                   a 60,60 0 1,1 120,0
                   a 60,60 0 1,1 -120,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="30" // Increased font size
            fontWeight="bold"
            letterSpacing="1px"
          >
            <textPath href="#middleCirclePath" startOffset="0%">
              🖥️ BACKEND ✦ NODE.JS ✦ APIs ✦ DATABASES ✦ AUTHENTICATION 🖥️
            </textPath>
          </text>
        </svg>
      </motion.div>
      <motion.div
        animate={innerControls}
        className="!transition-none absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 120 120" className="w-3/5 h-3/5">
          <defs>
            <path
              id="innerCirclePath"
              d="M 60, 60
                   m -40, 0
                   a 40,40 0 1,1 80,0
                   a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="1px"
          >
            <textPath href="#innerCirclePath" startOffset="0%">
              💻 FULL-STACK DEVELOPER 💻
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="!transition-none absolute inset-0 flex items-center justify-center">
        <Icon
          className="text-white animate-[spin_10s_linear_infinite]"
          icon="mdi:code"
          width="32"
          height="32"
        />
      </div>
    </div>
  );
}
