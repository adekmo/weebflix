import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const path = `anime/qtip/${id}`;
    const data = await AnimeApi(path);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching qtip:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime qtip" },
      { status: 500 }
    );
  }
}
