import dayjs from "dayjs";
import { BlogService, ExperienceService, ProjectService, StackService, UserService, SocialService, EducationService } from "@/lib/services";

export async function buildProfileKnowledge() {
  const [user, stacks, projects, experiences, blogs, socials, educations] = await Promise.all([
    UserService.findFirst({
      select: {
        name: true,
        title: true,
        location: true,
        bio: true,
        isAvailable: true,
      },
    }),
    StackService.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    }),
    ProjectService.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        previewUrl: true,
        sourceUrl: true,
        slug: true,
        stacks: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    }),
    ExperienceService.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        location: true,
        startDate: true,
        endDate: true,
        description: true,
      },
    }),
    BlogService.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        date: true,
      },
    }),
    SocialService.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        username: true,
      },
    }),
    EducationService.findMany({
      select: {
        id: true,
        name: true,
        department: true,
        location: true,
        startDate: true,
        endDate: true,
        description: true,
      },
    }),
  ]);

  const parts: string[] = [];

  if (user) {
    parts.push("=== PERSONAL INFORMATION ===");
    if (user.name) parts.push(`Name: ${user.name}`);
    if (user.title) parts.push(`Title: ${user.title}`);
    if (user.location) parts.push(`Location: ${user.location}`);
    if (typeof user.isAvailable === "boolean") {
      parts.push(`Availability: ${user.isAvailable ? "Open to new projects" : "Currently busy"}`);
    }
    if (user.bio) {
      parts.push(`Bio: ${user.bio}`);
    }
    parts.push("");
  }

  if (stacks.length) {
    parts.push("=== TECHNOLOGY STACK ===");
    stacks.forEach((stack) => {
      parts.push(`- ${stack.name}${stack.description ? `: ${stack.description}` : ""}`);
    });
    parts.push("");
  }

  if (projects.length) {
    parts.push("=== PROJECTS ===");
    projects.forEach((project) => {
      const tech = project.stacks.map((stack) => stack.name).join(", ");
      const techDetails = project.stacks
        .filter((s) => s.description)
        .map((s) => `${s.name} (${s.description})`)
        .join(", ");
      const links: string[] = [];
      if (project.previewUrl) links.push(`Live: ${project.previewUrl}`);
      if (project.sourceUrl) links.push(`Source: ${project.sourceUrl}`);
      parts.push(`Project: ${project.name}`);
      if (project.description) parts.push(`  Description: ${project.description}`);
      if (tech) parts.push(`  Technologies: ${tech}`);
      if (techDetails) parts.push(`  Tech Details: ${techDetails}`);
      if (links.length) parts.push(`  Links: ${links.join(" | ")}`);
      parts.push(`  Portfolio URL: ${project.slug}`);
      parts.push("");
    });
  }

  if (experiences.length) {
    parts.push("=== WORK EXPERIENCE ===");
    experiences.forEach((experience) => {
      const start = dayjs(experience.startDate).format("MMM YYYY");
      const end = experience.endDate ? dayjs(experience.endDate).format("MMM YYYY") : "Present";
      parts.push(`Position: ${experience.title}`);
      parts.push(`  Company: ${experience.name}`);
      if (experience.location) parts.push(`  Location: ${experience.location}`);
      parts.push(`  Period: ${start} - ${end}`);
      if (experience.description) parts.push(`  Description: ${experience.description}`);
      parts.push("");
    });
  }

  if (educations.length) {
    parts.push("=== EDUCATION ===");
    educations.forEach((education) => {
      const start = dayjs(education.startDate).format("MMM YYYY");
      const end = dayjs(education.endDate).format("MMM YYYY");
      parts.push(`Institution: ${education.name}`);
      parts.push(`  Department: ${education.department}`);
      if (education.location) parts.push(`  Location: ${education.location}`);
      parts.push(`  Period: ${start} - ${end}`);
      if (education.description) parts.push(`  Description: ${education.description}`);
      parts.push("");
    });
  }

  if (blogs.length) {
    parts.push("=== BLOG POSTS ===");
    blogs.forEach((blog) => {
      const date = dayjs(blog.date).format("MMM DD, YYYY");
      parts.push(`Title: ${blog.name}`);
      if (blog.description) parts.push(`  Description: ${blog.description}`);
      parts.push(`  Date: ${date}`);
      parts.push(`  URL: ${blog.slug}`);
      parts.push("");
    });
  }

  if (socials.length) {
    parts.push("=== SOCIAL LINKS ===");
    socials.forEach((social) => {
      parts.push(`${social.name}: ${social.url}${social.username ? ` (@${social.username})` : ""}`);
    });
    parts.push("");
  }

  return parts.join("\n");
}

