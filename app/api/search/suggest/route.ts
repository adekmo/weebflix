import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";
    if (!query) {
      return NextResponse.json({ success: true, suggestions: [] });
    }

    const path = `anime/search/suggest?q=${encodeURIComponent(query)}`;
    const data = await AnimeApi(path);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
