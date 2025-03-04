import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Stack: CollectionConfig = {
  slug: "stacks",
  admin: {
    useAsTitle: "name",
  },
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
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([
          { path: "/" },
          { path: "/stack" },
          { path: "/portfolio/[slug]", type: "page" },
        ]);
      },
    ],
  },
};
