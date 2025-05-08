"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Lightbox from "./ui/LightBox";
import Image from "next/image";

type Direction = "Up" | "Down";

interface MediaItem {
  url: string;
  alt: string;
  id: string;
  mimeType: string;
}

interface VerticalCarouselProps {
  items: MediaItem[];
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const totalPages: number = items.length;
  const autoScrollInterval = 3000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isLightboxOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, autoScrollInterval);
    }
  }, [totalPages, autoScrollInterval, isLightboxOpen]);

  const handleSwipe = (direction: Direction): void => {
    if (direction === "Up") {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    } else if (direction === "Down") {
      setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    }
    resetInterval();
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
    resetInterval();
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe("Up"),
    onSwipedDown: () => handleSwipe("Down"),
    trackMouse: true,
  });

  return (
    <div
      {...swipeHandlers}
      className="w-full h-[300px] lg:h-[450px] overflow-hidden relative"
    >
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 p-1.5 bg-primary/20 rounded-full">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-[7px] h-[7px] bg-white rounded-full cursor-pointer transition-all duration-300",
              {
                "opacity-100 scale-125": index === currentPage,
                "opacity-50 transition-all duration-500  hover:opacity-75 transition-all duration-500  hover:scale-110":
                  index !== currentPage,
              }
            )}
          />
        ))}
      </div>

      <motion.div
        style={{
          y: `-${currentPage * 100}%`,
        }}
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ y: `-${currentPage * 100}%` }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1],
        }}
        drag="y"
        dragElastic={0.1}
      >
        {items.map((item, index) => (
          <div key={index} className="relative h-full w-full">
            <Lightbox
              id={item.id}
              onOpenChange={(open) => {
                setIsLightboxOpen(open);
                if (!open) {
                  resetInterval();
                }
              }}
            >
              {item.mimeType === "video/webm" ? (
                <video
                  src={item.url}
                  autoPlay={isLightboxOpen}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              )}
            </Lightbox>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default VerticalCarousel;
