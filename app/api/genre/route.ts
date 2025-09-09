import { AnimeApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ambil dari endpoint kategori (misal default tv)
    const data = await AnimeApi("anime/category/tv?page=1");

    const genres = data?.data?.genres || [];
    return NextResponse.json({ success: true, genres });
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch genres" }, { status: 500 });
  }
}
