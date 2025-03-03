"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.1 },
          }}
          className="cursor-pointer fixed bottom-3 lg:bottom-6 right-3 lg:right-6 p-2 lg:p-3 bg-primary text-white rounded-full shadow-lg focus:outline-none z-50"
        >
          <Icon icon="lucide:arrow-up" className="w-4 lg:w-6 h-4 lg:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
