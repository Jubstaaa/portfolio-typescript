import React from "react";
import Card from "../components/ui/Card";
import { Icon } from "@iconify/react";
import Button from "../components/ui/Button";
import { StackService } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack | İlker Balcılar",
  description:
    "Explore the technologies and tools I use to build innovative and efficient solutions. From web development frameworks to backend technologies, discover the stack that powers my projects.",
};

async function page() {
  const stacks = await StackService.findMany();

  return (
    <div className="flex flex-col gap-4 lg:gap-12">
      <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-center tracking-tighter">
        Beneficial and potent apps and extensions that I utilize incessantly.
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5">
        {stacks.map((item) => (
          <Card
            key={item.id}
            classNames={{ body: "p-6 gap-3 lg:gap-6 justify-start" }}
          >
            <div
              content={item.name}
              className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden text-white"
              style={{ backgroundColor: item.color }}
            >
              <Icon icon={item.icon} width="32" height="32" />
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-primary text-lg font-semibold">
                {item.name}
              </h3>
              <p className="text-[#647586] font-secondary">
                {item.description}
              </p>
            </div>
            {item.url && (
              <Button
                classNames={{ body: "mt-auto" }}
                href={item.url}
                target="_blank"
                icon="f7:chevron-right"
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;
