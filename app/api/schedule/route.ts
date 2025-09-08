import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // (default: today)
    const date = req.nextUrl.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const range = req.nextUrl.searchParams.get("range");
    let path = "anime/schedule";

    if (date) {
      path += `?date=${date}`;
    } else if (range === "week") {
      path += `?week=true`;
    }

    const data = await AnimeApi(path);
    return NextResponse.json(data || {});
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
