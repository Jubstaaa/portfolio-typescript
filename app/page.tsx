import Image from "next/image";
import Badge from "./components/ui/Badge";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-x-4 gap-y-9">
      <Card classNames={{ body: "col-span-10 row-span-2 h-[450px]" }}>
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leding-none">
            Jack Ashford
            <span className="text-[#647586] text-base font-medium">
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
      <Card classNames={{ body: "col-span-2 row-span-1" }}>test1</Card>
      <Card classNames={{ body: "col-span-2 row-span-1" }}>test2</Card>
      {Array.from({ length: 2 }, (_, i) => (
        <Card
          key={i}
          as={Link}
          href={"#"}
          classNames={{ body: "col-span-6 row-span-2 !p-0 h-[400px] group" }}
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
      <Card classNames={{ body: "col-span-9 row-span-1" }}>
        <div className="flex flex-col gap-1.5 items-start text-2xl font-semibold leding-none">
          Explore my stack
          <span className="text-[#647586] text-base font-medium">
            Let&apos;s see my useful tools while cooking
          </span>
        </div>
        <div className="grid grid-cols-10 gap-5">
          
        </div>
      </Card>
    </div>
  );
}
