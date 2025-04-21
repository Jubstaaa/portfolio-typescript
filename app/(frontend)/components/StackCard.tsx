import React from "react";
import { Icon } from "@iconify/react";
import Card from "./ui/Card";
import Tooltip from "./ui/Tooltip";
import Button from "./ui/Button";
import { StackService } from "@/lib/services";

async function StackCard() {
  const stacks = await StackService.findMany({ take: 20 });

  return (
    <Card classNames={{ body: "gap-6" }}>
      <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
        Explore my stack
        <span className="text-secondary text-base font-medium tracking-normal">
          Let&apos;s see my useful tools while cooking
        </span>
      </div>
      <div className="w-full grid grid-cols-4 lg:grid-cols-10 gap-5">
        {stacks.map((item) => (
          <Tooltip
            key={item.id}
            content={item.name}
            className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
            style={{ backgroundColor: item.color }}
          >
            <Icon icon={item.icon} width="32" height="32" />
          </Tooltip>
        ))}
      </div>
      <Button fullWidth href="/stack">
        See All
      </Button>
    </Card>
  );
}

export default StackCard;
