"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { Icon } from "@iconify/react";

export interface LightboxProps {
  src: string;
  alt?: string;
  id: string | number;
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
          <motion.img
            loading="lazy"
            layoutId={`image-preview-${id}`}
            src={src}
            alt={alt}
            className="w-auto lg:max-h-96 h-auto object-contain rounded-large cursor-pointer shadow"
          />
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
                  <Dialog.Content className="w-full h-full lg:w-fit lg:h-4/5 flex items-center justify-center">
                    <VisuallyHidden>
                      <Dialog.Title>Image Preview</Dialog.Title>
                      <Dialog.Description>
                        Interaction built using shared layout animations and
                        Radix dialog primitive.
                      </Dialog.Description>
                    </VisuallyHidden>
                    <motion.div
                      layoutId={`image-preview-dialog-${id}`}
                      className="flex items-center justify-center relative w-fit h-fit lg:h-full mx-auto"
                    >
                      <motion.img
                        layoutId={`image-preview-${id}`}
                        src={src}
                        alt={alt}
                        className="w-full h-full rounded-large object-contain select-none mx-auto"
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
