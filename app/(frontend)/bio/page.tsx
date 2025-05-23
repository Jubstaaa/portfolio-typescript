import React from "react";
import Image from "next/image";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import dayjs from "dayjs";
import { cn } from "@/lib/cn";
import Button from "../components/ui/Button";
import { Icon } from "@iconify/react";
import {
  UserService,
  EducationService,
  ExperienceService,
  SkillService,
  SocialService,
} from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | İlker Balcılar",
  description:
    "Learn more about İlker Balcılar, a dedicated software developer with a passion for creating impactful digital solutions. Discover my journey, skills, and the technologies I use to solve real-world problems.",
};

async function page() {
  const user = await UserService.findFirst({
    include: {
      media: true,
    },
  });

  const socials = await SocialService.findMany();
  const experiences = await ExperienceService.findMany({
    include: {
      logo: true,
    },
  });
  const educations = await EducationService.findMany({
    include: {
      logo: true,
    },
  });
  const skills = await SkillService.findMany();

  const mail = socials.find((item) => item.name === "Mail");
  const twitter = socials.find((item) => item.name === "Twitter");
  const contactSocials = socials.filter(
    (item) =>
      item.name === "LinkedIn" ||
      item.name === "Discord" ||
      item.name === "Instagram"
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      {user && (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <div className="flex gap-2.5 items-center">
              {user.media.url && (
                <Image
                  className="w-24 h-24 rounded-full object-cover border border-divider bg-white"
                  src={user.media.url}
                  alt={user.media.alt}
                  width={200}
                  height={200}
                />
              )}
              <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
                {user.name}
                <span className="text-secondary text-base font-medium tracking-normal">
                  {user.location}
                </span>
              </div>
            </div>

            <Badge size="lg" color="blue" classNames={{ body: "normal-case" }}>
              {user.title}
            </Badge>
          </div>
          <Card classNames={{ body: "p-6 gap-6" }}>
            <h3 className="text-[22px] font-medium text-primary">About</h3>
            <p className="text-secondary text-base font-secondary tracking-normal leading-7">
              {user.bio}
            </p>
          </Card>
        </>
      )}

      <Card
        classNames={{
          body: "p-6 gap-6",
        }}
      >
        <h3 className="text-[22px] font-medium text-primary">Skills</h3>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 !max-h-96 overflow-auto lg:overflow-hidden">
          {skills.map((item) => (
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
      <Card classNames={{ body: "p-6 gap-6" }}>
        <h3 className="text-[22px] font-medium text-primary">Experience</h3>
        <div className="w-full flex flex-col gap-4 !max-h-96 overflow-auto">
          {experiences.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "w-full flex items-start justify-start gap-3 lg:gap-6",
                {
                  "pb-4 border-b border-b-[#f1f5f9]":
                    index !== experiences.length - 1,
                }
              )}
            >
              {item.logo && (
                <Image
                  className="w-9 lg:w-16 h-9 lg:h-16 rounded-full object-cover"
                  src={item.logo.url}
                  alt={item.logo.alt}
                  width={200}
                  height={200}
                />
              )}
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full flex flex-col gap-1.5">
                  <p className="text-lg lg:text-2xl font-semibold text-primary">
                    {item.title}
                  </p>
                  <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1.5">
                    <div className="flex flex-wrap items-center gap-1.5 lg:gap-2.5">
                      <span className="text-secondary text-base font-secondary tracking-normal">
                        {item.location}
                      </span>
                      <div className="w-1.5 h-1.5 bg-[#64748b] rounded-full" />
                      <span className="text-base text-primary tracking-normal font-secondary">
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
                <p className="text-secondary text-secondary] tracking-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card classNames={{ body: "p-6 gap-6" }}>
        <h3 className="text-[22px] font-medium text-primary">Education</h3>
        <div className="w-full flex flex-col gap-4 !max-h-96 overflow-auto">
          {educations.map((item, index) => (
            <div
              key={item.id}
              className={cn("w-full flex items-start justify-start gap-6", {
                "pb-4 border-b border-b-[#f1f5f9]":
                  index !== educations.length - 1,
              })}
            >
              <Image
                className="w-9 lg:w-16 h-9 lg:h-16 rounded-full object-cover"
                src={item.logo.url}
                alt={item.logo.alt}
                width={200}
                height={200}
              />
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full flex flex-col gap-1.5">
                  <p className="text-lg lg:text-2xl font-semibold text-primary">
                    {item.department}
                  </p>
                  <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1.5">
                    <div className="flex flex-wrap items-center gap-1.5 lg:gap-2.5">
                      <span className="text-secondary text-base font-secondary tracking-normal">
                        {item.location}
                      </span>
                      <div className="w-1.5 h-1.5 bg-[#64748b] rounded-full" />
                      <span className="text-base text-secondary tracking-normal font-secondary">
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
                <p className="text-secondary text-secondary] tracking-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <h3 id="contact" className="text-[22px] font-medium text-primary">
        Social Media & Contact
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
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
                  <span className="text-secondary text-sm font-medium">
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
                  <span className="text-secondary text-sm font-medium">
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
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2.5">
          {contactSocials.map((item) => (
            <Card
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
                <span className="text-secondary text-sm font-medium">
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
