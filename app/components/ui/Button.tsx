import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface ButtonProps {
  icon?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "none";
  color?: "light" | "dark";
  fullWidth?: boolean;
}

function Button({
  icon,
  children,
  size = "md",
  href = "#",
  target,
  color = "light",
  fullWidth = false,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        "flex flex-row flex-nowrap items-center justify-center w-min gap-2.5  relative cursor-pointer overflow-visible rounded-full shadow-none whitespace-nowrap font-medium hover:shadow-[0px_0px_0px_5px] hover:shadow-[#B8B8B8]/20 tracking-normal",
        {
          "!w-full": fullWidth,
          "px-2 w-9 h-9": size === "sm",
          "px-4 h-[50px]": size === "md",
          "bg-[#f1f5f9] text-black hover:bg-[#f8fafc]": color === "light",
          "bg-[#1e293b] text-white hover:bg-[#475569]": color === "dark",
        }
      )}
    >
      {children}
      {icon && <Icon icon={icon} width="20" height="20" />}
    </Link>
  );
}

export default Button;
