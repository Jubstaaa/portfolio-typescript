import { CollectionConfig } from "payload";

export const Skill: CollectionConfig = {
  slug: "skills",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
