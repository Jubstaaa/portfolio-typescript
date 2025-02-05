import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Button from "./ui/Button";

function Header() {
  const menus = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Me",
      href: "#",
    },
    {
      name: "Portfolio",
      href: "#",
    },
    {
      name: "Store",
      href: "#",
    },
    {
      name: "Stack",
      href: "#",
    },
    {
      name: "Blog",
      href: "#",
    },
  ];

  return (
    <div className="flex flex-row flex-nowrap items-center content-center justify-between min-h-fit overflow-visible p-4 relative border border-divider bg-white rounded-xlarge backdrop-blur-[10px]">
      <div className="flex gap-1.5 items-center text-2xl font-semibold font-primary text-[#0c0f12]">
        <Icon icon="mdi:xml" width="32" height="32" /> İlker Balcılar
      </div>
      <div className="flex flex-row flex-nowrap items-center content-center justify-center flex-1 w-[1px] min-h-fit gap-0 overflow-visible p-0 relative font-medium text-[#1e293b]">
        {menus.map((menu, i) => (
          <Link
            key={i}
            className="flex items-center p-4 leading-none hover:text-[#475569]"
            href={menu.href}
          >
            {menu.name}
          </Link>
        ))}
      </div>
      <Button color="dark" href="#" icon="f7:chevron-right">
        Get Template
      </Button>
    </div>
  );
}

export default Header;
