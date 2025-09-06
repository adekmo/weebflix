// src/app/api/home/[id]/episodes/[epNumber]/stream/route.ts
import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; epNumber: string } }
) {
  try {
    // Correctly format the ID parameter for the API
    const episodeId = `${params.id}?ep=${params.epNumber}`;
    const path = `anime/episode-srcs?id=${encodeURIComponent(episodeId)}&server=hd-1&category=sub`;
    
    // Log the URL to see what is being sent to the API
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