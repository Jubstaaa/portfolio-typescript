import { CollectionConfig } from "payload";

export const Stack: CollectionConfig = {
  slug: "stacks",
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
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "order",
      type: "number",
    },
  ],
};
