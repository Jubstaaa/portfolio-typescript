"use client";
import "@tmikeladze/react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, IconName } from "@tmikeladze/react-cmdk";
import { useState } from "react";
import Button from "./Button";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { menus } from "../Header";

const CommandMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const { data = [] } = useSWR<
    {
      name: string;
      items: {
        id: string;
        name: string;
        slug: string;
      }[];
    }[]
  >(search ? ["/api/search", { query: search }] : null, fetcher);

  const filteredMenus = filterItems(
    [
      {
        heading: "Menu",
        id: "menu",
        items: menus.map((menu) => ({
          id: menu.name,
          children: menu.name,
          icon: menu.icon as IconName,
          href: menu.href,
        })),
      },
    ],
    search
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        classNames={{ body: "hidden lg:flex" }}
        color="dark"
        icon="f7:search"
      />
      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        isOpen={open}
        page={"root"}
        search={search}
        commandPaletteContentClassName={"light"}
      >
        <CommandPalette.Page id="root">
          {filteredMenus.map((category) => (
            <CommandPalette.List key={category.id} heading={category.heading}>
              {category.items.map((item, index) => (
                <CommandPalette.ListItem
                  index={index}
                  key={item.id}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.children}
                </CommandPalette.ListItem>
              ))}
            </CommandPalette.List>
          ))}

          {data.map((category) => (
            <CommandPalette.List key={category.name} heading={category.name}>
              {category.items.map((item, index) => (
                <CommandPalette.ListItem
                  index={index}
                  key={item.id}
                  href={item.slug}
                >
                  {item.name}
                </CommandPalette.ListItem>
              ))}
            </CommandPalette.List>
          ))}
        </CommandPalette.Page>
      </CommandPalette>
    </>
  );
};

export default CommandMenu;
