import React from "react";
import { Icon } from "@iconify/react";
import Button from "./ui/Button";
import { SocialService } from "@/lib/services/social.service";
import { Social } from "@/types/Social";

async function Footer() {
  const socialService = new SocialService();
  const socials: Social[] = await socialService.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="flex flex-row flex-nowrap items-center content-center justify-between min-h-fit overflow-visible p-4 relative border border-divider bg-white rounded-xlarge backdrop-blur-[10px]">
      <div className="flex items-center gap-5 h-[30px]">
        <div className="flex gap-1.5 items-center text-2xl font-semibold font-primary text-[#0c0f12]">
          <Icon icon="mdi:xml" width="32" height="32" /> İlker Balcılar
        </div>
        <div className="h-full w-[1px] bg-[#e2e8e0]" />
        <span className="text-[#4a4d55] font-semibold">
          Ⓒ 2025 Bentofy. All Rights Reserved
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
