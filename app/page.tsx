import Image from "next/image";
import Badge from "./components/ui/Badge";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Tooltip from "./components/ui/Tooltip";
import VerticalSlider from "./components/ui/VerticalCarousel";
import MusicCard from "./components/ui/MusicCard";

export default function Home() {
  const stacks = [
    {
      name: "JavaScript",
      icon: "proicons:javascript",
      color: "#f7df1e",
    },
    {
      name: "TypeScript",
      icon: "proicons:typescript",
      color: "#3178c6",
    },
    {
      name: "NextJS",
      icon: "ri:nextjs-line",
      color: "#000000",
    },
    {
      name: "Vercel",
      icon: "ri:vercel-fill",
      color: "#000000",
    },
    {
      name: "React",
      icon: "ri:reactjs-line",
      color: "#00d8ff",
    },
    {
      name: "Node.js",
      icon: "ri:nodejs-line",
      color: "#6cc24a",
    },
    {
      name: "Unity",
      icon: "mdi:unity",
      color: "#222c37",
    },
    {
      name: "C#",
      icon: "devicon-plain:csharp",
      color: "#9B4993",
    },
    {
      name: "HTML",
      icon: "proicons:html",
      color: "#e34f26",
    },
    {
      name: "CSS",
      icon: "proicons:css",
      color: "#2191EB",
    },
    {
      name: "Git",
      icon: "mdi:git",
      color: "#E94E31",
    },
    {
      name: "GitHub",
      icon: "proicons:github",
      color: "#333",
    },
    {
      name: "DigitalOcean",
      icon: "mdi:digital-ocean",
      color: "#008bcf",
    },
    {
      name: "Cloudflare",
      icon: "devicon-plain:cloudflare",
      color: "#f38020",
    },
    {
      name: "jQuery",
      icon: "mdi:jquery",
      color: "#0769ad",
    },
    {
      name: "Postman",
      icon: "devicon-plain:postman",
      color: "#ef5b25",
    },
    {
      name: "MySQL",
      icon: "cib:mysql",
      color: "#00758f",
    },
    {
      name: "MongoDB",
      icon: "cib:mongodb",
      color: "#589636",
    },
    {
      name: "PostgreSQL",
      icon: "cib:postgresql",
      color: "#31648C",
    },
    {
      name: "Nginx",
      icon: "cib:nginx",
      color: "#009736",
    },
  ];

  return (
    <div className="flex flex-col gap-9">
      <div className="grid grid-cols-12 gap-4 h-[450px]">
        <Card classNames={{ body: "col-span-10" }}>
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
              Jack Ashford
              <span className="text-[#647586] text-base font-medium tracking-normal">
                California, US
              </span>
            </div>
            <Badge animate="ping" iconSize="sm" color="green" icon="mdi:circle">
              Available
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
            <Button color="dark" href="#" icon="f7:chevron-right">
              Contact Me
            </Button>
          </div>
          <Image
            className="absolute bottom-0 right-0 w-auto h-full drop-shadow-[-47px_13px_38px_rgba(125,135,145,0.25)]"
            src="/images/bio.png"
            alt="İlker Balcılar"
            width={750}
            height={500}
          />
        </Card>
        <div className="flex flex-col gap-4 col-span-2">
          <Card classNames={{ body: "!p-4 gap-3 justify-start" }}>
            <MusicCard />
          </Card>
          <Card>Test2</Card>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }, (_, i) => (
          <Card
            key={i}
            as={Link}
            href={"#"}
            classNames={{ body: "h-[400px] !p-0 group" }}
          >
            <div className="flex flex-col p-4 pt-6 gap-4 group-hover:pl-6">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:xml" width="32" height="32" />
                <div className="flex flex-col gap-1 text-lg font-semibold leading-none">
                  Istanbul
                  <span className="text-[#647586] text-sm font-medium group-hover:text-primary">
                    All-in-one SaaS Digital Product Framer Template
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5 items-start">
                <Badge animate="spin" color="blue" icon="mdi:react">
                  JavaScript Expert
                </Badge>
                <Badge>$100-150/HR</Badge>
              </div>
            </div>
            <div className="w-full h-full overflow-hidden rounded-large relative">
              <Image
                className="w-full h-full object-cover group-hover:scale-125"
                src="/images/test.jpg"
                alt="İlker Balcılar"
                width={750}
                height={500}
              />
              <div className="w-full absolute bottom-0 left-0 flex justify-between items-end p-6 opacity-0 group-hover:opacity-100">
                <div className="flex gap-1.5">
                  <Badge>15+ Pages</Badge>
                  <Badge>19+ Components</Badge>
                </div>
                <Button icon="f7:chevron-right" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col gap-4 col-span-9">
          <Card classNames={{ body: "gap-6" }}>
            <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
              Explore my stack
              <span className="text-[#647586] text-base font-medium tracking-normal">
                Let&apos;s see my useful tools while cooking
              </span>
            </div>
            <div className="w-full grid grid-cols-10 gap-5">
              {stacks.map((item, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Tooltip content={item.name}>
                    <Icon icon={item.icon} width="32" height="32" />
                  </Tooltip>
                </div>
              ))}
            </div>
            <Button fullWidth href="#">
              See All
            </Button>
          </Card>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <Card key={i} classNames={{ body: "!p-4 h-[220px]" }}>
                <div className="flex flex-col gap-5 justify-between">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
                    style={{ backgroundColor: "#00d8ff" }}
                  >
                    <Icon icon={"ri:reactjs-line"} width="32" height="32" />
                  </div>
                  <div className="flex flex-col gap-1.5 items-start text-lg font-semibold leading-none">
                    Explore my stack
                    <span className="text-[#647586] text-sm font-medium">
                      @johndoe
                    </span>
                  </div>
                </div>
                <Button size="xs" color="gray" href="#">
                  Follow
                </Button>
              </Card>
            ))}
          </div>
        </div>
        <div className="h-full col-span-3">
          <Card as={Link} classNames={{ body: "h-full group" }} href={"#"}>
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none text-white">
                Take a look to my portfolio{" "}
                <span className="text-[#cbd5e1] text-base group-hover:text-white">
                  Let&apos;s see my useful tools while cooking
                </span>
              </div>
              <div className="w-32 rounded-full bg-white font-semibold px-4 h-[50px] whitespace-nowrap flex items-center justify-between group-hover:w-full">
                See Portfolio
                <Icon
                  className="opacity-0 group-hover:opacity-100"
                  icon={"f7:chevron-right"}
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <Image
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-125"
              src="/images/test.jpg"
              alt="İlker Balcılar"
              width={750}
              height={500}
            />
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card classNames={{ body: "col-span-3 !p-0" }}>
          <VerticalSlider />
        </Card>
        <Card classNames={{ body: "col-span-9 gap-6" }}>
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none">
              Let&apos;s review my blog posts
              <span className="text-[#647586] text-base font-medium tracking-normal">
                I&apos;m divulging my adventures on my weblog, let&apos;s
                scrutinize it.
              </span>
            </div>
            <Button href="#">See All</Button>
          </div>
          <div className="flex gap-2 items-stretch overflow-auto h-full">
            {Array.from({ length: 3 }, (_, i) => (
              <Card
                as={Link}
                href={"#"}
                key={i}
                classNames={{
                  body: "w-[250px] !p-6 justify-end",
                }}
              >
                <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none text-white relative z-50">
                  Harnessing the Power of No-Code Tools
                  <span className="text-[#cbd5e1] text-base">Jan 12, 2024</span>
                </div>
                <Image
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/images/test.jpg"
                  alt="İlker Balcılar"
                  width={400}
                  height={400}
                />
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
