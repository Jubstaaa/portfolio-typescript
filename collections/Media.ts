import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  fields: [
    {
      name: "url",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.filename) {
          const baseUrl = "https://blob.vercel-storage.com/uploads/"; // Vercel Blob ana URL
          return {
            ...doc,
            url: `${baseUrl}${doc.filename}`, // Tam URL'yi oluştur
          };
        }
        return doc;
      },
    ],
  },
};
