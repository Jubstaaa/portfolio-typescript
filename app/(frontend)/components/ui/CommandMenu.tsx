"use client";
import "@tmikeladze/react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems } from "@tmikeladze/react-cmdk";
import { useState } from "react";
import Button from "./Button";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { menus } from "../Header";
import { useDebounce } from "use-debounce";
import Link from "next/link";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  let index = 0;
  const { data = [], isLoading } = useSWR<
    {
      name: string;
      items: {
        id: string;
        name: string;
        slug: string;
      }[];
    }[]
  >(
    debouncedSearch ? ["/api/search", { query: debouncedSearch }] : null,
    fetcher
  );

  const filteredMenus = filterItems(
    [
      {
        heading: "Menu",
        id: "menu",
        items: menus.map((menu) => ({
          id: menu.name,
          children: menu.name,
          icon: menu.icon,
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
        page="root"
        search={search}
        commandPaletteContentClassName="light"
        renderLink={(props) => (
          <Link href={props.href ?? "#"} {...props}></Link>
        )}
      >
        <CommandPalette.Page id="root">
          {filteredMenus.map((category) => (
            <CommandPalette.List key={category.id} heading={category.heading}>
              {category.items.map((item) => (
                <CommandPalette.ListItem
                  index={index++}
                  key={item.id}
                  icon={item.icon}
                  href={item.href}
                >
                  {item.children}
                </CommandPalette.ListItem>
              ))}
            </CommandPalette.List>
          ))}

          {isLoading && (
            <CommandPalette.List heading="Searching...">
              <CommandPalette.ListItem index={0}>
                Loading...
              </CommandPalette.ListItem>
            </CommandPalette.List>
          )}

          {data.map((category) => (
            <CommandPalette.List key={category.name} heading={category.name}>
              {category.items.map((item) => (
                <CommandPalette.ListItem
                  index={index++}
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
