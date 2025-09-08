import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const { category } = await params;
    const path = `anime/category/${category}?page=${page}`;
    const data = await AnimeApi(path);

    // console.log(data, 'ini url');
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
