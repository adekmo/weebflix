import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    const res = await fetch(url, {
    headers: {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
        "Referer": "https://hianime.to/",
        "Origin": "https://hianime.to",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "sec-ch-ua":
        '"Chromium";v="119", "Google Chrome";v="119", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
    },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to proxy stream: ${res.status}` },
        { status: res.status }
      );
    }

    // Forward stream sebagai Response (passthrough)
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*"); // supaya bisa diakses di browser

    return new NextResponse(res.body, {
      status: res.status,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Failed to proxy stream" }, { status: 500 });
  }
}
