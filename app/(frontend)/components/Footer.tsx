import React from "react";
import { Icon } from "@iconify/react";
import Button from "./ui/Button";
import { SocialService } from "@/lib/services";

async function Footer() {
  const socials = await SocialService.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="flex flex-col lg:flex-row flex-nowrap items-center content-center justify-between min-h-fit overflow-visible p-4 relative border border-divider bg-white rounded-xlarge backdrop-blur-[10px] h-auto lg:h-[30px] gap-5">
      <div className="flex flex-col lg:flex-row items-center gap-5 ">
        <div className="flex gap-1.5 items-center text-2xl font-semibold font-primary text-primary">
          <Icon icon="mdi:xml" width="32" height="32" /> İlker Balcılar
        </div>
        <div className="hidden lg:block h-8 w-[1px] bg-[#e2e8e0]" />
        <span className="text-[#4a4d55] font-semibold">
          Ⓒ 2025 İlker Balcılar . All Rights Reserved
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {socials.map((item) => (
          <Button
            key={item.id}
            size="sm"
            icon={item.icon}
            href={item.url}
            target="_blank"
            color="dark"
          />
        ))}
      </div>
    </div>
  );
}

export default Footer;
