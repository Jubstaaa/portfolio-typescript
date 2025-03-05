"use client";
import { cn } from "@/lib/cn";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  classNames?: {
    body?: string;
  };
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  whileHover?: boolean;
}

function Card({
  children,
  classNames = {},
  loading = false,
  href,
  className,
  target,
  whileHover = true,
  ...rest
}: CardProps) {
  const classes = cn(
    "flex flex-col items-start justify-between p-[30px] relative overflow-hidden rounded-large bg-white border border-[#e2e8f0] h-[180px] max-h-[180px]",
    {
      "!max-h-[99999px] h-full": !loading,
      "animate-pulse": loading,
    },
    classNames.body,
    className
  );

  const MotionCard = (
    <motion.div
      className={classes}
      {...(rest as HTMLMotionProps<"div">)}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={
        whileHover
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={
        href
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : undefined
      }
    >
      {!loading && children}
    </motion.div>
  );

  if (href) {
    return (
      <Link target={target} href={href} className="w-full h-full block">
        {MotionCard}
      </Link>
    );
  }

  return MotionCard;
}

export default Card;
