import { BlogService, ProjectService } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";

    const blogs = await BlogService.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const projects = await ProjectService.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const response = [];

    if (blogs.length > 0) {
      response.push({ name: "Blog", items: blogs });
    }

    if (projects.length > 0) {
      response.push({ name: "Project", items: projects });
    }

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
