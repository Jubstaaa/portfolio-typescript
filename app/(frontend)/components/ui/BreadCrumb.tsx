"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

function BreadCrumb() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length < 2) return null;

  return (
    <div className="absolute left-0 top-0 w-full h-[calc(100%+48px)] bg-white rounded-t-xlarge rounded-3xl border border-divider backdrop-blur-[10px] flex justify-start items-end px-4 py-3">
      <div className="flex items-center gap-3 text-xs font-medium">
        <Link href={"/"}>Home</Link>
        {pathSegments.map((item, index) => (
          <>
            <Icon icon="mdi:chevron-right" className="w-6 h-6 text-[#cbd5e1]" />
            <Link
              className={
                pathSegments.length - 1 === index
                  ? "last:text-[#94a3b8] cursor-default"
                  : ""
              }
              key={index}
              href={pathSegments.length - 1 === index ? "#" : `/${item}`} 
            >
              {slugToTitle(item)}
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default BreadCrumb;

export const slugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
