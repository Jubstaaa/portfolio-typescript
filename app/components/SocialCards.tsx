import React from "react";
import Card from "./ui/Card";
import { Icon } from "@iconify/react";
import Button from "./ui/Button";
import { SocialService } from "@/lib/services/social.service";
import { Social } from "@/types/Social";

async function SocialCards() {
  const socialService = new SocialService();
  const socials: Social[] = await socialService.findMany({ take: 3 });

  return (
    <div className="grid grid-cols-3 gap-4">
      {socials.map((item) => (
        <Card key={item.id} classNames={{ body: "p-4 h-[220px]" }}>
          <div className="flex flex-col gap-5 justify-between">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
              style={{ backgroundColor: item.color }}
            >
              <Icon icon={item.icon} width="32" height="32" />
            </div>
            <div className="flex flex-col gap-1.5 items-start text-lg font-semibold leading-none">
              {item.name}
              <span className="text-[#647586] text-sm font-medium">
                @{item.username}
              </span>
            </div>
          </div>
          <Button size="xs" color="gray" href={item.url} target="_blank">
            Follow
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default SocialCards;
