import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },

    {
      name: "lastName",
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
      name: "isAvailable",
      type: "checkbox",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
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
        await revalidatePaths([{ path: "/" }, { path: "/bio" }]);
      },
    ],
    afterDelete: [
      async () => {
        await revalidatePaths([{ path: "/" }, { path: "/bio" }]);
      },
    ],
  },
};
