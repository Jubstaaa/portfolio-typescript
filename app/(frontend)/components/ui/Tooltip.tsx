"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
  style?: React.CSSProperties | undefined;
}

export default function Tooltip({
  children,
  content,
  className,
  style,
}: TooltipProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePos({ x: event.clientX, y: event.clientY });
    });
  };

  return (
    <div
      className={className}
      style={style}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {tooltipVisible && mousePos.x && mousePos.y && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  left: mousePos.x + 10,
                  top: mousePos.y + 10,
                  pointerEvents: "none",
                  zIndex: 9999,
                  transition: "all 0.2s ease-out",
                }}
              >
                <Badge>{content}</Badge>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
