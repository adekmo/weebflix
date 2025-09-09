import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { producerName: string } }
) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const { producerName } = params;

    const path = `anime/producer/${producerName}?page=${page}`;
    const data = await AnimeApi(path);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching producer:", error);
    return NextResponse.json(
      { error: "Failed to fetch producer" },
      { status: 500 }
    );
  }
}
