"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import {
  useState,
  ReactNode,
  cloneElement,
  isValidElement,
  ReactElement,
  ComponentProps,
} from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/cn";

export interface LightboxProps {
  id: string | number;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export default function Lightbox({
  id,
  onOpenChange,
  children,
}: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const wrapWithMotion = (
    element: ReactElement<ComponentProps<"div">>,
    className: string,
    useOriginalClassName: boolean = true
  ) => {
    const MotionComponent = motion.div;
    return (
      <MotionComponent
        layoutId={`image-preview-${id}`}
        className={
          useOriginalClassName
            ? cn(element.props.className, className, "shadow-none")
            : className
        }
      >
        {cloneElement(element, {
          ...element.props,
          className: useOriginalClassName
            ? cn(element.props.className, className)
            : className,
        })}
      </MotionComponent>
    );
  };

  const wrappedChildren = isValidElement(children)
    ? wrapWithMotion(
        children as ReactElement<ComponentProps<"div">>,
        "cursor-pointer"
      )
    : children;

  const dialogChildren = wrapWithMotion(
    children as ReactElement<ComponentProps<"div">>,
    "w-full h-full rounded-large object-contain select-none mx-auto overflow-hidden shadow",
    false
  );

  const isVideo = isValidElement(children) && children.type === "video";

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
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          {isVideo ? (
            <div className="w-full h-full relative">
              {wrappedChildren}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                  <Icon icon="lucide:play" className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
          ) : (
            wrappedChildren
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <AnimatePresence initial={false} mode="sync">
            {isOpen && (
              <>
                <Dialog.Overlay>
                  <motion.div
                    className="fixed inset-0 z-50 h-full w-full backdrop-blur-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                  <Dialog.Content className="w-full h-auto lg:w-fit lg:h-4/5 flex items-center justify-center">
                    <VisuallyHidden>
                      <Dialog.Title>Media Preview</Dialog.Title>
                      <Dialog.Description>
                        Interaction built using shared layout animations and
                        Radix dialog primitive.
                      </Dialog.Description>
                    </VisuallyHidden>
                    <motion.div
                      layoutId={`image-preview-dialog-${id}`}
                      className="flex items-center justify-center relative w-fit h-full mx-auto"
                    >
                      {dialogChildren}
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          role="button"
                          aria-label="Close dialog"
                          className="absolute top-3 right-3 z-10 h-fit w-fit rounded-full border border-white/20 bg-white/20 p-[6px] backdrop-blur hover:bg-white/50 focus-visible:outline-none cursor-pointer shadow"
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
