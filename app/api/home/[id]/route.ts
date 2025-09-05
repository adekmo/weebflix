import { AnimeApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}){
    try {
        const data = await AnimeApi(`anime/info?id=${params.id}`);
        return NextResponse.json(data.data.anime || {})
    } catch (error) {
        console.error("Error fetching anime detail:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}