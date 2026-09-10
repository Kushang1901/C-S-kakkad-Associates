import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function cleanEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#38;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&nbsp;/g, " ");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing required 'url' parameter" },
      { status: 400 }
    );
  }

  // Ensure security: only allow fetching from casansaar.com
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
    if (!parsedUrl.hostname.includes("casansaar.com")) {
      return NextResponse.json(
        { error: "Target domain not permitted" },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid URL provided" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(targetUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch article: HTTP status ${res.status}`);
    }

    const html = await res.text();

    // 1. Extract Title
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? cleanEntities(h1Match[1].replace(/<[^>]*>/g, "")).trim() : "Statutory Article Details";

    // 2. Extract Category
    const catMatch = html.match(/<p class="categoryshort">[\s\S]*?Category\s*:\s*<a[^>]*>([\s\S]*?)<\/a>/i);
    const category = catMatch ? cleanEntities(catMatch[1].replace(/<[^>]*>/g, "")).trim() : "Tax & Corporate Update";

    // 3. Extract Date
    const dateMatch = html.match(/([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4}(?:\s+[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)?)/i);
    const date = dateMatch ? dateMatch[1].trim() : "Recent Update";

    // 4. Extract Banner Image
    const imgMatch = html.match(/<div class="article-image">\s*<img[^>]+src="([^"]+)"/i) ||
                     html.match(/<div class="article-media-wrap">[\s\S]*?<img[^>]+src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1].trim() : null;

    // 5. Extract Full Body Content
    const postdataMatch = html.match(/<div[^>]*class="postdata"[^>]*>([\s\S]*?)<\/div>/i);
    let contentHtml = "";

    if (postdataMatch) {
      let rawContent = postdataMatch[1];
      // Clean unwanted scripts or trackers if any
      rawContent = rawContent.replace(/<script[\s\S]*?<\/script>/gi, "");
      // Convert internal relative links to absolute or remove internal links
      rawContent = rawContent.replace(/href="(\/[^"]+)"/gi, 'href="https://www.casansaar.com$1"');
      // Target blank for links
      rawContent = rawContent.replace(/<a /gi, '<a target="_blank" rel="noopener noreferrer" ');
      contentHtml = rawContent.trim();
    } else {
      // Fallback: extract paragraphs
      const pMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
      contentHtml = pMatches.slice(1, 5).join("\n");
    }

    return NextResponse.json({
      title,
      category,
      date,
      image,
      contentHtml,
      originalUrl: targetUrl,
      source: "CA Sansaar & Official Statutory Notifications"
    });

  } catch (error) {
    console.error("Error fetching article detail:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve full article content",
        title: "Statutory Circular / Update Details",
        category: "Regulatory Update",
        date: "Current Financial Year",
        contentHtml: `<p>The requested update details could not be retrieved from the source server at this moment. Please verify your internet connection or reference the official gazette.</p>`,
        originalUrl: targetUrl,
        source: "CA Sansaar"
      },
      { status: 200 }
    );
  }
}
