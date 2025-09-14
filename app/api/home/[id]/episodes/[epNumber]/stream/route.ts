import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

// biarkan Next.js yang typing `params`
export async function GET(
  req: NextRequest,
  context: { params: { id: string; epNumber: string } }
) {
  try {
    const { id, epNumber } = context.params;

    const episodeId = `${id}?ep=${epNumber}`;
    const path = `anime/episode-srcs?id=${encodeURIComponent(
      episodeId
    )}&server=hd-1&category=sub`;

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
