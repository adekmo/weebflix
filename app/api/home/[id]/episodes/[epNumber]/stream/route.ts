import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; epNumber: string }> }
) {
  const { id, epNumber } = await context.params;

  try {
    const episodeId = `${id}?ep=${epNumber}`;
    const path = `anime/episode-srcs?id=${encodeURIComponent(episodeId)}&server=hd-1&category=sub`;

    console.log("HiAnime path →", path);

    const data = await AnimeApi(path);
    return NextResponse.json(data || {});
  } catch (error) {
    console.error("Error fetching streaming:", error);
    return NextResponse.json(
      { error: "Failed to fetch streaming" },
      { status: 500 }
    );
  }
}
