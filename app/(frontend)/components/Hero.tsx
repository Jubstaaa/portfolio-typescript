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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[450px]">
      <Card
        classNames={{
          body: "lg:col-span-10 h-[600px] lg:h-[450px] lg:hero-shadow",
        }}
      >
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
        <div className="flex flex-col gap-5 items-start relative z-10">
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
          <Button color="dark" href="/bio#contact" icon="f7:chevron-right">
            Contact Me
          </Button>
        </div>
        {user.media && (
          <Image
            className="absolute bottom-12 lg:bottom-0 right-0 w-full lg:w-auto h-auto lg:h-full drop-shadow-[-47px_13px_38px_rgba(125,135,145,0.25)"
            src={user.media.url}
            alt={user.media.alt}
            width={750}
            height={500}
            priority
          />
        )}
      </Card>
      <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 lg:col-span-2 h-[150px] lg:h-[450px]">
        <MusicCard />
        <Card classNames={{ body: "flex-1 lg:flex-unset p-0" }}>
          <RotatingBadge />
        </Card>
      </div>
    </div>
  );
}

export default Hero;
