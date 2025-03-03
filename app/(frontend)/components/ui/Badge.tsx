import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  icon?: string;
  iconSize?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  color?: "default" | "green" | "blue" | "gray" | "red";
  animate?: "ping" | "spin";
  size?: "xs" | "sm" | "md" | "lg";
  classNames?: {
    body?: string;
    icon?: string;
  };
}

function Badge({
  children,
  color = "default",
  icon,
  iconSize = "md",
  classNames = {},
  animate,
  size = "md",
}: BadgeProps) {
  const iconSizes = {
    sm: "12",
    md: "18",
    lg: "30",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center px-2.5 font-medium uppercase rounded-full font-secondary tracking-normal gap-1",
        classNames.body,
        {
          "h-8 text-xs": size === "md",
          "h-9 text-base": size === "lg",
          "bg-[#edeff0] text-[#4a4d55]": color === "default",
          "bg-[#bff6b6] text-[#307f4a]": color === "green",
          "bg-[#cbfeff] text-[#037c9b]": color === "blue",
          "bg-[#f1f5f9] text-[#64748b]": color === "gray",
          "bg-[#ffdddd] text-[#b91c1c]": color === "red",
        }
      )}
    >
      <div className="relative ">
        {icon && (
          <Icon
            className={cn(classNames.icon, {
              "text-primary": color === "default",
              "text-[#3fc96d]": color === "green",
              "text-[#0EA5E9]": color === "blue",
              "text-[#b91c1c]": color === "red",
              "animate-[spin_3s_linear_infinite]": animate === "spin",
            })}
            icon={icon}
            width={iconSizes[iconSize]}
            height={iconSizes[iconSize]}
          />
        )}
        {icon && animate === "ping" && (
          <Icon
            className={cn("absolute w-full h-full inset-0 animate-ping", {
              "text-primary": color === "default",
              "text-[#3fc96d]": color === "green",
              "text-[#0EA5E9]": color === "blue",
              "text-[#b91c1c]": color === "red",
            })}
            icon={icon}
            width={iconSizes[iconSize]}
            height={iconSizes[iconSize]}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export default Badge;
