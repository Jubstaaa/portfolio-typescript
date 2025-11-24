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
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        endpoint: process.env.S3_ENDPOINT || `https://${process.env.S3_REGION}.${process.env.S3_HOSTNAME}`,
        forcePathStyle: true,
      },
      acl: "public-read",
    }),
  ],

  secret: process.env.PAYLOAD_SECRET as string,

  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),

  sharp,
});
