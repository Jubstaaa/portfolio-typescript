import React from "react";
import Image from "next/image";
import { UserService } from "@/lib/services/user.service";
import { User } from "@/types/User";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import dayjs from "dayjs";
import { cn } from "../utils/cn";
import { SocialService } from "@/lib/services/social.service";
import { Social } from "@/types/Social";
import Button from "../components/ui/Button";
import { Icon } from "@iconify/react";
import Link from "next/link";

async function page() {
  const userService = new UserService();
  const users: User[] = await userService.findMany({
    take: 1,
    include: {
      skills: true,
      educations: {
        orderBy: {
          startDate: "desc",
        },
      },
      experiences: {
        orderBy: {
          startDate: "desc",
        },
      },
    },
  });
  const user = users[0];

  const socialService = new SocialService();
  const socials: Social[] = await socialService.findMany({
    orderBy: {
      order: "asc",
    },
  });

  const mail = socials.find((item) => item.name === "Mail");
  const twitter = socials.find((item) => item.name === "Twitter");
  const contactSocials = socials.filter(
    (item) =>
      item.name === "LinkedIn" ||
      item.name === "Discord" ||
      item.name === "Instagram"
  );

  return (
    <div className="flex flex-col gap-6 px-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-2.5 items-center">
          {user.image && (
            <Image
              className="w-24 h-24 rounded-full object-cover border border-divider bg-white"
              src={user.image}
              alt={user.name}
              width={200}
              height={200}
            />
          )}
          <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
            {user.name}
            <span className="text-[#647586] text-base font-medium tracking-normal">
              {user.location}
            </span>
          </div>
        </div>
        <span className="font-secondary text-[#6666ff] font-medium tracking-normal">
          {user.title}
        </span>
      </div>
      <Card classNames={{ body: "p-6 gap-6" }}>
        <h3 className="text-[22px] font-medium text-[#020617]">About</h3>
        <p className="text-[#647586] text-base font-secondary tracking-normal leading-7">
          {user.bio}
        </p>
      </Card>
      <Card classNames={{ body: "p-6 gap-6" }}>
        <h3 className="text-[22px] font-medium text-[#020617]">Skills</h3>
        <div className="w-full grid grid-cols-3 gap-2.5">
          {user.skills.map((item) => (
            <Badge
              classNames={{ body: "normal-case" }}
              size="lg"
              color="gray"
              key={item.id}
            >
              {item.name}
            </Badge>
          ))}
        </div>
      </Card>
      <Card classNames={{ body: "p-6 gap-6 !max-h-[400px] overflow-auto" }}>
        <h3 className="text-[22px] font-medium text-[#020617]">Experience</h3>
        <div className="w-full flex flex-col gap-4">
          {user.experiences.map((item, index) => (
            <div
              key={item.id}
              className={cn("w-full flex items-start justify-start gap-6", {
                "pb-4 border-b border-b-[#f1f5f9]":
                  index !== user.experiences.length - 1,
              })}
            >
              {item.logo && (
                <Image
                  className="w-16 h-16 rounded-full object-cover"
                  src={item.logo}
                  alt={item.name}
                  width={200}
                  height={200}
                />
              )}
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full flex flex-col gap-1.5">
                  <p className="text-2xl font-semibold text-[#020617]">
                    {item.title}
                  </p>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#647586] text-base font-secondary tracking-normal">
                        {item.location}
                      </span>
                      <div className="w-1.5 h-1.5 bg-[#64748b] rounded-full" />
                      <span className="text-base text-[#020617] tracking-normal font-secondary">
                        {item.name}
                      </span>
                    </div>
                    <span>
                      {dayjs(item.startDate).format("MMMM YYYY")} -{" "}
                      {item.endDate
                        ? dayjs(item.endDate).format("MMMM YYYY")
                        : "Present"}
                    </span>
                  </div>
                </div>
                <p className="text-[#647586] text-secondary] tracking-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card classNames={{ body: "p-6 gap-6 !max-h-[400px] overflow-auto" }}>
        <h3 className="text-[22px] font-medium text-[#020617]">Education</h3>
        <div className="w-full flex flex-col gap-4">
          {user.educations.map((item, index) => (
            <div
              key={item.id}
              className={cn("w-full flex items-start justify-start gap-6", {
                "pb-4 border-b border-b-[#f1f5f9]":
                  index !== user.educations.length - 1,
              })}
            >
              {item.logo && (
                <Image
                  className="w-16 h-16 rounded-full object-cover"
                  src={item.logo}
                  alt={item.name}
                  width={200}
                  height={200}
                />
              )}
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full flex flex-col gap-1.5">
                  <p className="text-2xl font-semibold text-[#020617]">
                    {item.department}
                  </p>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#647586] text-base font-secondary tracking-normal">
                        {item.location}
                      </span>
                      <div className="w-1.5 h-1.5 bg-[#64748b] rounded-full" />
                      <span className="text-base text-[#647586] tracking-normal font-secondary">
                        {item.name}
                      </span>
                    </div>
                    <span>
                      {dayjs(item.startDate).format("MMMM YYYY")} -{" "}
                      {item.endDate
                        ? dayjs(item.endDate).format("MMMM YYYY")
                        : "Present"}
                    </span>
                  </div>
                </div>
                <p className="text-[#647586] text-secondary] tracking-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <h3 id="contact" className="text-[22px] font-medium text-[#020617]">
        Social Media & Contact
      </h3>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="grid grid-cols-2 col-span-2 gap-2.5">
          {mail && (
            <Card classNames={{ body: "p-4" }}>
              <div className="flex flex-col gap-5 justify-between">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
                  style={{ backgroundColor: mail.color }}
                >
                  <Icon icon={mail.icon} width="32" height="32" />
                </div>
                <div className="flex flex-col gap-1.5 items-start text-lg font-semibold leading-none">
                  {mail.name}
                  <span className="text-[#647586] text-sm font-medium">
                    {mail.username}
                  </span>
                </div>
              </div>
              <Button size="xs" color="gray" href={mail.url} target="_blank">
                Send Mail
              </Button>
            </Card>
          )}
          {twitter && (
            <Card classNames={{ body: "p-4" }}>
              <div className="flex flex-col gap-5 justify-between">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
                  style={{ backgroundColor: twitter.color }}
                >
                  <Icon icon={twitter.icon} width="32" height="32" />
                </div>
                <div className="flex flex-col gap-1.5 items-start text-lg font-semibold leading-none">
                  {twitter.name}
                  <span className="text-[#647586] text-sm font-medium">
                    {twitter.username}
                  </span>
                </div>
              </div>
              <Button size="xs" color="gray" href={twitter.url} target="_blank">
                Send Message
              </Button>
            </Card>
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          {contactSocials.map((item) => (
            <Card
              as={Link}
              classNames={{ body: "p-4 flex-row gap-2.5 justify-start" }}
              key={item.id}
              href={item.url}
              target="_blank"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
                style={{ backgroundColor: item.color }}
              >
                <Icon icon={item.icon} width="32" height="32" />
              </div>
              <div className="flex flex-col gap-1.5 items-start text-lg font-semibold leading-none">
                {item.name}
                <span className="text-[#647586] text-sm font-medium">
                  {item.username}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
