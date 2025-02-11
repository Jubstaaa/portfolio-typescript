import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Button from "./ui/Button";

function Header() {
  const menus = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Me",
      href: "/me",
    },
    {
      name: "Portfolio",
      href: "/portfolio",
    },
    {
      name: "Stack",
      href: "/stack",
    },
    {
      name: "Blog",
      href: "#",
    },
  ];

  return (
    <div className="flex flex-row flex-nowrap items-center content-center justify-between min-h-fit overflow-visible p-4 relative border border-divider bg-white rounded-xlarge backdrop-blur-[10px]">
      <Link
        href={"/"}
        className="flex gap-1.5 items-center text-2xl font-semibold font-primary text-primary"
      >
        <Icon icon="mdi:xml" width="32" height="32" /> İlker Balcılar
      </Link>
      <div className="flex flex-row flex-nowrap items-center content-center justify-center flex-1 w-[1px] min-h-fit gap-0 overflow-visible p-0 relative font-medium text-primary">
        {menus.map((menu, i) => (
          <Link
            key={i}
            className="flex items-center p-4 leading-none transition-all duration-500  hover:text-[#475569] active:opacity-50"
            href={menu.href}
          >
            {menu.name}
          </Link>
        ))}
      </div>
      <Button color="dark" href="/me#contact" icon="f7:chevron-right">
        Hire Me
      </Button>
    </div>
  );
}

export default Header;
