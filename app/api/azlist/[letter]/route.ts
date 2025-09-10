import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ letter: string }>}){
    try {
        const page = req.nextUrl.searchParams.get("page") || "1";
        const { letter } = await params;

        const path = `anime/azlist/${letter}?sortOption=all&page=${page}`;
        const data = await AnimeApi(path);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching A-Z list:", error);
        return NextResponse.json(
            { error: "Failed to fetch A-Z list" },
            { status: 500 }
        );
    }
}