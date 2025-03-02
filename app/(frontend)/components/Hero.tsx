import React from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import RotatingBadge from "./RotatingBadge";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { UserService } from "@/lib/services";

async function Hero() {
  const user = await UserService.findFirst({
    include: {
      media: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-[450px]">
      <Card classNames={{ body: "col-span-10 h-[450px]" }}>
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
            {user.name}
            <span className="text-[#647586] text-base font-medium tracking-normal">
              {user.location}
            </span>
          </div>
          <Badge
            animate={user.isAvailable ? "ping" : undefined}
            iconSize="sm"
            color={user.isAvailable ? "green" : "red"}
            icon="mdi:circle"
          >
            {user.isAvailable ? "Available" : "Busy"}
          </Badge>
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex gap-1.5 items-start">
            <Badge animate="spin" color="blue" icon="mdi:react">
              JavaScript Expert
            </Badge>
            <Badge>$100-150/HR</Badge>
          </div>
          <div>
            <p className="text-2xl font-semibold">
              {" "}
              Sizzle, Spice, and Design Great!
            </p>
            <p className="text-[#647586] text-sm font-medium tracking-normal">
              Adding flavor to your product with designs{" "}
            </p>
            <p className="text-[#647586] text-sm font-medium tracking-normal">
              that sizzle and entice.
            </p>
          </div>
          <Button color="dark" href="/me#contact" icon="f7:chevron-right">
            Contact Me
          </Button>
        </div>
        {user.media && (
          <Image
            className="absolute bottom-0 right-0 w-auto h-full drop-shadow-[-47px_13px_38px_rgba(125,135,145,0.25)]"
            src={user.media.url}
            alt={user.name}
            width={750}
            height={500}
          />
        )}
      </Card>
      <div className="flex flex-col gap-4 col-span-2 h-[450px]">
        <MusicCard />
        <Card classNames={{ body: "p-0" }}>
          <RotatingBadge />
        </Card>
      </div>
    </div>
  );
}

export default Hero;
