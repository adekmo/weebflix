import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const query = params.get("q") || "";
    const page = params.get("page") || "1";

    // optional filters
    const type = params.get("type") || "";
    const status = params.get("status") || "";
    const rated = params.get("rated") || "";
    const score = params.get("score") || "";
    const season = params.get("season") || "";
    const language = params.get("language") || "";
    const sort = params.get("sort") || "";
    const genres = params.get("genres") || "";

    if (!query) {
      return NextResponse.json({
        success: true,
        data: { animes: [], totalPages: 0 },
      });
    }

    const path =
      `anime/search?q=${encodeURIComponent(query)}&page=${page}` +
      (type ? `&type=${encodeURIComponent(type)}` : "") +
      (status ? `&status=${encodeURIComponent(status)}` : "") +
      (rated ? `&rated=${encodeURIComponent(rated)}` : "") +
      (score ? `&score=${encodeURIComponent(score)}` : "") +
      (season ? `&season=${encodeURIComponent(season)}` : "") +
      (language ? `&language=${encodeURIComponent(language)}` : "") +
      (sort ? `&sort=${encodeURIComponent(sort)}` : "") +
      (genres ? `&genres=${encodeURIComponent(genres)}` : "");

    const data = await AnimeApi(path);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
