import { CollectionConfig } from "payload";

export const Social: CollectionConfig = {
  slug: "socials",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
    },
    {
      name: "color",
      type: "text",
      required: true,
    },
    {
      name: "username",
      type: "text",
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "order",
      type: "number",
    },
  ],
};
