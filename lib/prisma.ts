import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
  result: {
    user: {
      name: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
    media: {
      url: {
        needs: { filename: true },
        compute(media) {
          return `${process.env.S3_BUCKET_URL}/${media.filename}`;
        },
      },
      alt: {
        needs: { alt: true },
        compute(media) {
          return media.alt || "İlker Balcilar Portfolio Site Image";
        },
      },
    },
    blog: {
      slug: {
        needs: { slug: true },
        compute(blog) {
          return `/blog/${blog.slug}`;
        },
      },
    },
    project: {
      slug: {
        needs: { slug: true },
        compute(project) {
          return `/portfolio/${project.slug}`;
        },
      },
    },
  },
  query: {
    experience: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { startDate: "desc" },
        });
      },
    },
    education: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { startDate: "desc" },
        });
      },
    },
    image: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { order: "asc" },
        });
      },
    },
    project: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { order: "asc" },
        });
      },
    },
    blog: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { date: "desc" },
        });
      },
    },
    stack: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { order: "asc" },
        });
      },
    },
    social: {
      async findMany({ args, query }) {
        return query({
          ...args,
          orderBy: args.orderBy ?? { order: "asc" },
        });
      },
    },
  },
});
