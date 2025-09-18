"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function RotatingBadge() {
  return (
    <div className="relative w-full h-full aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-2xl p-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] opacity-10" />
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay" />

      {/* Outer text */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
        className="absolute inset-0 flex items-center justify-center opacity-50"
      >
        <svg viewBox="0 0 200 200" className="w-[200%] h-[200%]">
          <defs>
            <path
              id="outerCirclePath"
              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
            />
          </defs>
          <text fill="white" fontSize="28" fontWeight="bold">
            <textPath href="#outerCirclePath" startOffset="0%">
              🚀 FULL-STACK ✦ API ✦ DATABASES ✦ CLOUD 🚀
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Middle text */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
        className="absolute inset-0 flex items-center justify-center opacity-70"
      >
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5">
          <defs>
            <path
              id="middleCirclePath"
              d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
          </defs>
          <text fill="white" fontSize="20" fontWeight="bold">
            <textPath href="#middleCirclePath" startOffset="0%">
              🖥️ NODE.JS ✦ APIs ✦ AUTH 🖥️
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner text */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 120 120" className="w-3/5 h-3/5">
          <defs>
            <path
              id="innerCirclePath"
              d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text fill="white" fontSize="12" fontWeight="bold">
            <textPath href="#innerCirclePath" startOffset="0%">
              💻 FULL-STACK 💻
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
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
