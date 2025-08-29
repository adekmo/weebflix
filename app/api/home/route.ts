
import { AnimeApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await AnimeApi(
          `anime/home`
        );
    // console.log("RAW API:", data.data.spotlightAnimes);
    return NextResponse.json(data.data.spotlightAnimes || []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}