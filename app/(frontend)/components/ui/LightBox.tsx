"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const MotionImage = motion.create(Image);

export interface LightboxProps {
  src: string;
  alt?: string;
  id?: string | number;
}

export default function Lightbox({ src, alt, id }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
        duration: 0.6,
      }}
    >
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <motion.div
            layoutId={`image-preview-dialog-${id}`}
            className="relative z-10 w-full cursor-pointer rounded-lg"
            role="button"
          >
            <MotionImage
              layoutId={`image-preview-${id}`}
              src={src}
              alt={alt}
              width={1000}
              height={1000}
              priority
              className="w-auto lg:max-h-96 h-full object-contain rounded-large"
            />
          </motion.div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <AnimatePresence initial={false} mode="sync">
            {isOpen && (
              <>
                <Dialog.Overlay>
                  <motion.div
                    className="fixed inset-0 z-40 h-full w-full backdrop-blur-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                  <Dialog.Content>
                    <VisuallyHidden>
                      <Dialog.Title>Image Preview</Dialog.Title>
                      <Dialog.Description>
                        Interaction built using shared layout animations and
                        Radix dialog primitive.
                      </Dialog.Description>
                    </VisuallyHidden>
                    <motion.div
                      layoutId={`image-preview-dialog-${id}`}
                      className="relative"
                    >
                      <MotionImage
                        layoutId={`image-preview-${id}`}
                        src={src}
                        alt={alt}
                        width={1000}
                        height={1000}
                        className="rounded-large object-contain select-none"
                      />
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          role="button"
                          aria-label="Close dialog"
                          className="absolute top-3 right-3 z-10 h-fit w-fit rounded-full border border-white/20 bg-white/20 p-[6px] backdrop-blur hover:bg-white/50 focus-visible:outline-none cursor-pointer"
                        >
                          <Icon
                            className="text-white"
                            icon="lucide:x"
                            width={20}
                            height={20}
                          />
                        </button>
                      </Dialog.Close>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </MotionConfig>
  );
}
