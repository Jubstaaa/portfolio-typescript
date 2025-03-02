import Image from "next/image";
import Badge from "./components/ui/Badge";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import { Icon } from "@iconify/react";
import VerticalSlider from "./components/VerticalCarousel";
import StackCard from "./components/StackCard";
import SocialCards from "./components/SocialCards";
import Hero from "./components/Hero";
import { BlogService, ImageService } from "@/lib/services";
import dayjs from "dayjs";

async function page() {
  const images = await ImageService.findMany({
    include: {
      media: true,
    },
  });

  const blogs = await BlogService.findMany({
    select: {
      id: true,
      media: true,
      name: true,
      date: true,
      slug: true,
      blogCategory: true,
    },
  });

  return (
    <div className="flex flex-col gap-9">
      <Hero />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }, (_, i) => (
          <Card key={i} href={"#"} classNames={{ body: "h-[400px] p-0 group" }}>
            <div className="flex flex-col p-4 pt-6 gap-4 transition-all duration-500 group-hover:pl-6">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:xml" width="32" height="32" />
                <div className="flex flex-col gap-1 text-lg font-semibold leading-none">
                  Istanbul
                  <span className="text-[#647586] text-sm font-medium transition-all duration-500 group-hover:text-primary">
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
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125"
                src="https://nmpz8srvxyslvrdu.public.blob.vercel-storage.com/portfolio-a6iLVbDr8l9eDqkylt32gII3dGeGRh.jpeg"
                alt="İlker Balcılar"
                width={750}
                height={500}
              />
              <div className="w-full absolute bottom-0 left-0 flex justify-between items-end p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
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
          <StackCard />
          <SocialCards />
        </div>
        <div className="h-full col-span-3">
          <Card
            classNames={{ body: "h-full group gradient-radial" }}
            href={"/portfolio"}
          >
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none text-white">
                Take a look to my portfolio{" "}
                <span className="text-[#cbd5e1] text-base transition-all duration-500 group-hover:text-white">
                  Let&apos;s see my useful tools while cooking
                </span>
              </div>
              <div className="w-32 rounded-full bg-white font-semibold px-4 h-[50px] whitespace-nowrap flex items-center justify-between transition-all duration-500 group-hover:w-full">
                See Portfolio
                <Icon
                  className="opacity-0 transition-all duration-500 group-hover:opacity-100"
                  icon={"f7:chevron-right"}
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <Image
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-125"
              src="https://nmpz8srvxyslvrdu.public.blob.vercel-storage.com/portfolio-a6iLVbDr8l9eDqkylt32gII3dGeGRh.jpeg"
              alt="İlker Balcılar"
              width={750}
              height={500}
            />
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card classNames={{ body: "col-span-3 p-0" }}>
          <VerticalSlider images={images.map((item) => item.media.url)} />
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
            <Button href="/blog">See All</Button>
          </div>
          <div className="flex gap-2 items-stretch overflow-x-auto overflow-y-hidden w-full h-full">
            {blogs.map((item) => (
              <Card
                href={`/blog/${item.slug}`}
                key={item.id}
                classNames={{
                  body: "w-[250px] p-6 justify-end gradient-radial",
                }}
              >
                <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leading-none text-white relative z-50">
                  {item.name}
                  <span className="text-[#cbd5e1] text-base">
                    {dayjs(item.date).format("MMMM DD,  YYYY")}
                  </span>
                </div>
                <Image
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.media.url}
                  alt={item.name}
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

export default page;
