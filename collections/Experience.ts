import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experiences",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "mediaId",
      type: "upload",
      relationTo: "media",
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
