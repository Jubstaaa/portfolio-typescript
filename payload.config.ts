import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { Stack } from "./collections/Stack";
import { Project } from "./collections/Project";
import { ProjectCategory } from "./collections/ProjectCategory";
import { Media } from "./collections/Media";
import { Image } from "./collections/Image";
import { Users } from "./collections/User";
import { Skill } from "./collections/Skill";
import { Experience } from "./collections/Experience";
import { Social } from "./collections/Social";
import { Education } from "./collections/Education";
import { Blog } from "./collections/Blog";
import { BlogCategory } from "./collections/BlogCategory";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Users,
    Stack,
    Project,
    ProjectCategory,
    Media,
    Image,
    Skill,
    Social,
    Experience,
    Education,
    Blog,
    BlogCategory,
  ],

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.DO_SPACES_BUCKET || "jubstaa-portfolio",
      config: {
        credentials: {
          accessKeyId: process.env.DO_SPACES_KEY || "",
          secretAccessKey: process.env.DO_SPACES_SECRET || "",
        },
        region: process.env.DO_SPACES_REGION || "",
        endpoint:
          `https://${process.env.DO_SPACES_REGION}.${process.env.DO_SPACES_HOST}` ||
          "",
      },
      acl: "public-read",
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),

  sharp,
});
