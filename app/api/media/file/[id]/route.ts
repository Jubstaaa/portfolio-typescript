import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  `https://${process.env.S3_HOSTNAME as string}`,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = process.env.S3_BUCKET ?? "";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id || !BUCKET_NAME) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;

  const width = searchParams.get("width") ? Number(searchParams.get("width")) : undefined;
  const height = searchParams.get("height") ? Number(searchParams.get("height")) : undefined;
  const quality = searchParams.get("quality") ? Number(searchParams.get("quality")) : 75;
  const resizeMode = (searchParams.get("resize") as "cover" | "contain" | "fill") || "contain";

  try {
    const { data, error } = await supabaseAdmin
      .storage
      .from(BUCKET_NAME)
      .createSignedUrl(id, 60, {
        transform: {
          width,
          height,
          quality,
          resize: resizeMode,
          format: 'origin',
        },
      });

    if (error || !data?.signedUrl) {
      return new NextResponse("Image not found or access denied", { status: 404 });
    }

    const response = await fetch(data.signedUrl);

    if (!response.ok) {
      return new NextResponse("Failed to fetch image from Supabase", { status: 404 });
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("Content-Type") || "image/webp");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}