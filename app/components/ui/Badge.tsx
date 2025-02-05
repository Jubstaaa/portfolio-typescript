import React from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface BadgeProps {
  icon?: string;
  iconSize?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  color?: "default" | "green" | "blue";
  animate?: "ping" | "spin";
  classNames?: {
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
}: BadgeProps) {
  const iconSizes = {
    sm: "12",
    md: "18",
    lg: "30",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center px-2.5 h-8 text-xs font-medium uppercase rounded-full font-secondary tracking-normal gap-1",
        {
          "bg-[#edeff0] text-[#4a4d55]": color === "default",
          "bg-[#bff6b6] text-[#307f4a]": color === "green",
          "bg-[#cbfeff] text-[#037c9b]": color === "blue",
        }
      )}
    >
      <div className="relative ">
        {icon && (
          <Icon
            className={clsx(classNames.icon, {
              "text-black": color === "default",
              "text-[#3fc96d]": color === "green",
              "text-[#0EA5E9]": color === "blue",
              "animate-[spin_3s_linear_infinite]": animate === "spin",
            })}
            icon={icon}
            width={iconSizes[iconSize]}
            height={iconSizes[iconSize]}
          />
        )}
        {icon && animate === "ping" && (
          <Icon
            className={clsx("absolute w-full h-full inset-0 animate-ping", {
              "text-black": color === "default",
              "text-[#3fc96d]": color === "green",
              "text-[#0EA5E9]": color === "blue",
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
