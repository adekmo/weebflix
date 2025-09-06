import { NextRequest, NextResponse } from "next/server";

// proxy untuk file m3u8, ts, dan vtt
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    // Menambahkan header Referer dan Origin untuk melewati autentikasi server.
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
        "Referer": "https://hianime.to/",
        "Origin": "https://hianime.to",
        "Accept": "*/*",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") || "";

    if (url.endsWith(".m3u8")) {
      let text = await res.text();
      const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

      // Mengganti URL relatif di dalam file .m3u8 dengan proxy URL
      text = text.replace(/([^\s]+\.((ts)|(m3u8)|(vtt)))/g, (match) => {
        return `/api/proxy/hls?url=${encodeURIComponent(baseUrl + match)}`;
      });

      return new NextResponse(text, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Proxy HLS error:", err);
    return NextResponse.json(
      { error: "Failed to proxy HLS stream" },
      { status: 500 }
    );
  }
}