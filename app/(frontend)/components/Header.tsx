"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import BreadCrumb from "./ui/BreadCrumb";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(false);
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const [menus] = useState<
    {
      name: string;
      href: string;
    }[]
  >([
    { name: "Home", href: "/" },
    { name: "Me", href: "/bio" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Stack", href: "/stack" },
    { name: "Blog", href: "/blog" },
  ]);
  const pathname = usePathname();

  useEffect(() => {
    setPathSegments(pathname.split("/").filter(Boolean));
  }, [pathname]);

  useEffect(() => {
    setShowBreadCrumb(pathSegments.length >= 2 ? true : false);
  }, [pathSegments]);

  return (
    <header
      className={cn("relative", {
        "mb-[50px]": showBreadCrumb,
      })}
    >
      <div
        className={cn(
          "flex flex-row flex-nowrap items-center justify-between min-h-fit overflow-visible p-4 relative border border-divider bg-white rounded-xlarge backdrop-blur-[10px] z-20 transition-all",
          { "rounded-b-none": isOpen }
        )}
      >
        <Link
          href="/"
          className="flex gap-1.5 items-center text-2xl font-semibold font-primary text-primary"
        >
          <Icon icon="mdi:xml" className="w-7 lg:w-8 h-7 lg:h-8" /> İlker
          Balcılar
        </Link>
        <div className="hidden lg:flex items-center justify-center flex-1 gap-4 text-primary font-medium">
          {menus.map((menu, i) => (
            <Link
              key={i}
              className="p-4 transition-all duration-300 hover:text-[#475569] active:opacity-50"
              href={menu.href}
            >
              {menu.name}
            </Link>
          ))}
        </div>
        <Button
          classNames={{ body: "hidden lg:flex" }}
          color="dark"
          href="/bio#contact"
          icon="f7:chevron-right"
        >
          Hire Me
        </Button>
        <Icon
          onClick={() => setIsOpen((state) => !state)}
          icon="mdi:menu"
          className="lg:hidden w-8 h-8 cursor-pointer"
        />
      </div>
      {showBreadCrumb && <BreadCrumb pathSegments={pathSegments} />}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute w-full top-full left-0 flex flex-col items-center p-0 border border-divider bg-white rounded-t-none rounded-xlarge backdrop-blur-[10px] z-20"
          >
            {menus.map((menu, i) => (
              <Link
                key={i}
                href={menu.href}
                className="w-full text-center py-3 text-lg font-medium transition-all duration-300 hover:text-[#475569] active:opacity-50"
                onClick={() => setIsOpen(false)}
              >
                {menu.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
