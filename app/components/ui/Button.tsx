"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/app/utils/cn";

interface ButtonProps {
  icon?: string;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "none";
  color?: "light" | "dark" | "gray";
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  classNames?: {
    body?: string;
  };
}

function Button({
  icon,
  children,
  size = "md",
  href,
  target,
  color = "light",
  fullWidth = false,
  onClick,
  disabled = false,
  classNames = {},
}: ButtonProps) {
  const className = cn(
    "flex flex-row flex-nowrap items-center justify-center w-min gap-2.5 relative overflow-visible rounded-full shadow-none whitespace-nowrap font-medium tracking-normal transition-all duration-200",
    classNames.body,
    {
      "cursor-pointer hover:shadow-[0px_0px_0px_5px] hover:shadow-[#B8B8B8]/20 active:opacity-50 active:shadow-[0px_0px_0px_2px]":
        !disabled,
      "w-full": fullWidth,
      "px-2 h-8 text-xs hover:shadow-[0px_0px_0px_3px]":
        size === "xs" && !disabled,
      "px-2 h-9": size === "sm",
      "px-4 h-[50px]": size === "md",
      "bg-[#f1f5f9] text-black hover:bg-[#f8fafc]":
        color === "light" && !disabled,
      "bg-[#1e293b] text-white hover:bg-[#475569]":
        color === "dark" && !disabled,
      "bg-[#f4f4f4] text-black hover:bg-[#f4f4f4]":
        color === "gray" && !disabled,
      "bg-[#f1f5f9] text-black": color === "light" && disabled,
      "bg-[#1e293b] text-white": color === "dark" && disabled,
      "bg-[#f4f4f4] text-black": color === "gray" && disabled,
    }
  );

  const content = (
    <>
      {children}
      {icon && <Icon icon={icon} width="20" height="20" />}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={className}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
