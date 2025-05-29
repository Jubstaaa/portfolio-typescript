import { revalidatePaths } from "@/lib/actions";
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
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([{ path: "/bio" }]);
      },
    ],
    afterDelete: [
      async () => {
        await revalidatePaths([{ path: "/bio" }]);
      },
    ],
  },
};
