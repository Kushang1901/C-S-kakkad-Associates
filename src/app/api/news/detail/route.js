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

async function fetchHtmlWithFallback(url) {
  // 1. Attempt direct fetch
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    if (res.ok) {
      return await res.text();
    }
  } catch (directErr) {
    console.warn("Direct fetch from casansaar failed, switching to resilient proxy:", directErr);
  }

  // 2. Cloudflare / Datacenter bypass proxy (for Vercel / AWS serverless hosting)
  try {
    const proxyRes = await fetch(`https://r.jina.ai/${url}`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "X-Return-Format": "html"
      }
    });
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.data?.html) {
        return data.data.html;
      }
    }
  } catch (proxyErr) {
    console.error("Proxy fetch failed:", proxyErr);
  }

  throw new Error("Unable to fetch HTML via direct or proxy channels");
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
    const html = await fetchHtmlWithFallback(targetUrl);

    // 1. Extract Title
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? cleanEntities(h1Match[1].replace(/<[^>]*>/g, "")).trim() : "Statutory Circular / Article Details";

    // 2. Extract Category
    const catMatch = html.match(/<p class="categoryshort">[\s\S]*?Category\s*:\s*<a[^>]*>([\s\S]*?)<\/a>/i);
    const category = catMatch ? cleanEntities(catMatch[1].replace(/<[^>]*>/g, "")).trim() : "Regulatory Update";

    // 3. Extract Date
    const dateMatch = html.match(/([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4}(?:\s+[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)?)/i);
    const date = dateMatch ? dateMatch[1].trim() : "Current Financial Year";

    // 4. Extract Banner Image
    const imgMatch = html.match(/<div class="article-image">\s*<img[^>]+src="([^"]+)"/i) ||
                     html.match(/<div class="article-media-wrap">[\s\S]*?<img[^>]+src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1].trim() : null;

    // 5. Extract Full Body Content
    const postdataMatch = html.match(/<div[^>]*class="postdata"[^>]*>([\s\S]*?)<\/div>/i);
    let contentHtml = "";

    if (postdataMatch) {
      let rawContent = postdataMatch[1];
      rawContent = rawContent.replace(/<script[\s\S]*?<\/script>/gi, "");
      rawContent = rawContent.replace(/href="(\/[^"]+)"/gi, 'href="https://www.casansaar.com$1"');
      rawContent = rawContent.replace(/<a /gi, '<a target="_blank" rel="noopener noreferrer" ');
      contentHtml = rawContent.trim();
    } else {
      const pMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
      contentHtml = pMatches.slice(1, 6).join("\n");
    }

    return NextResponse.json({
      title,
      category,
      date,
      image,
      contentHtml: contentHtml || "<p>Detailed statutory text is currently being synchronized. Please check back shortly.</p>",
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
        contentHtml: `<p>The statutory notification details are currently being synchronized from the official gazette. Please refresh in a moment or reference the official gazette portal.</p>`,
        originalUrl: targetUrl,
        source: "CA Sansaar"
      },
      { status: 200 }
    );
  }
}
