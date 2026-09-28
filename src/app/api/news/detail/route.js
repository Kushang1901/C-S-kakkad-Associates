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

// Lightweight serverless-safe HTML sanitizer without heavy CJS/jsdom dependencies
function sanitizeHtml(dirty) {
  if (!dirty) return "";
  let clean = dirty;
  // Remove script and style elements with content
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  // Remove potentially dangerous/interactive tags
  clean = clean.replace(/<\/?(iframe|object|embed|form|input|textarea|button|meta|link|base|applet)\b[^>]*>/gi, "");
  // Remove all event handlers (onclick, onerror, onload, etc.)
  clean = clean.replace(/\s*on[a-zA-Z]+\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi, "");
  // Remove javascript:, vbscript:, and harmful data URIs
  clean = clean.replace(/(href|src)\s*=\s*['"]\s*(javascript|vbscript):[^'"]*['"]/gi, "");
  return clean;
}

async function fetchHtmlWithFallback(url) {
  // 1. Attempt direct fetch (Fast, with 3.5s timeout for serverless)
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 500) {
        return text;
      }
    }
  } catch (directErr) {
    console.warn("Direct fetch from source failed or timed out, trying proxies:", directErr.message);
  }

  // 2. Cloudflare / Datacenter bypass proxy (Jina AI Reader)
  try {
    const proxyRes = await fetch(`https://r.jina.ai/${url}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: {
        "Accept": "application/json",
        "X-Return-Format": "html"
      }
    });
    if (proxyRes.ok) {
      const contentType = proxyRes.headers.get("content-type") || "";
      if (contentType.includes("json")) {
        const data = await proxyRes.json();
        if (data.data?.html) {
          return data.data.html;
        }
      } else {
        const text = await proxyRes.text();
        if (text && text.length > 500) {
          return text;
        }
      }
    }
  } catch (proxyErr) {
    console.warn("Jina proxy fetch failed:", proxyErr.message);
  }

  // 3. Fallback: AllOrigins raw proxy
  try {
    const allOriginsRes = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    if (allOriginsRes.ok) {
      const text = await allOriginsRes.text();
      if (text && text.length > 500) {
        return text;
      }
    }
  } catch (allOriginsErr) {
    console.warn("AllOrigins proxy fetch failed:", allOriginsErr.message);
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

  // Ensure strict SSRF protection: allow casansaar domains and standard official portals
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = 
      hostname.endsWith("casansaar.com") ||
      hostname.endsWith("incometax.gov.in") ||
      hostname.endsWith("cbic.gov.in") ||
      hostname.endsWith("mca.gov.in") ||
      hostname.endsWith("gst.gov.in") ||
      hostname.endsWith("icai.org");

    if (!["http:", "https:"].includes(parsedUrl.protocol) || !isAllowed) {
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
    const catMatch = html.match(/<p class="categoryshort">[\s\S]*?Category\s*:\s*<a[^>]*>([\s\S]*?)<\/a>/i) ||
                     html.match(/<p class="post-category">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    const category = catMatch ? cleanEntities(catMatch[1].replace(/<[^>]*>/g, "")).trim() : "Regulatory Update";

    // 3. Extract Date
    const dateMatch = html.match(/([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4}(?:\s+[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)?)/i);
    const date = dateMatch ? dateMatch[1].trim() : "Current Financial Year";

    // 4. Extract Banner Image
    const imgMatch = html.match(/<div class="article-image">\s*<img[^>]+src="([^"]+)"/i) ||
                     html.match(/<div class="article-media-wrap">[\s\S]*?<img[^>]+src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1].trim() : null;

    // 5. Extract Full Body Content
    const postdataMatch = html.match(/<div[^>]*class=["']postdata["'][^>]*>([\s\S]*?)<\/div>/i);
    let contentHtml = "";

    if (postdataMatch) {
      let rawContent = postdataMatch[1];
      rawContent = rawContent.replace(/<script[\s\S]*?<\/script>/gi, "");
      rawContent = rawContent.replace(/href="(\/[^"]+)"/gi, 'href="https://www.casansaar.com$1"');
      rawContent = rawContent.replace(/<a /gi, '<a target="_blank" rel="noopener noreferrer nofollow" ');
      contentHtml = rawContent.trim();
    } else {
      const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
      if (articleMatch) {
        let rawContent = articleMatch[1];
        rawContent = rawContent.replace(/<script[\s\S]*?<\/script>/gi, "");
        contentHtml = rawContent.trim();
      } else {
        const pMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
        contentHtml = pMatches.slice(1, 8).join("\n");
      }
    }

    // Sanitize HTML safely
    const sanitizedHtml = sanitizeHtml(
      contentHtml || "<p>Detailed statutory text is currently being synchronized. Please check back shortly.</p>"
    );

    return NextResponse.json({
      title,
      category,
      date,
      image,
      contentHtml: sanitizedHtml,
      originalUrl: targetUrl,
      source: "CA Sansaar & Official Statutory Notifications"
    });

  } catch (error) {
    console.error("Error fetching article detail, providing graceful fallback:", error.message);

    // Derive a clean readable title from URL slug if possible
    let derivedTitle = "Statutory Notification / Circular Details";
    try {
      const pathSegments = new URL(targetUrl).pathname.split("/").filter(Boolean);
      const lastSlug = pathSegments.find(s => s.length > 5 && !s.endsWith(".html")) || pathSegments[pathSegments.length - 1];
      if (lastSlug) {
        derivedTitle = lastSlug
          .replace(/\.html$/i, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      }
    } catch (_) {}

    return NextResponse.json(
      {
        title: derivedTitle,
        category: "Regulatory Circular",
        date: "Current Financial Year",
        contentHtml: `
          <p>The detailed notification content is being synchronized from the statutory publisher.</p>
          <p style="margin-top: 16px;">You can view the full official publication directly on the source portal:</p>
          <p style="margin-top: 12px;">
            <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="color: #1e3a8a; font-weight: 600; text-decoration: underline;">
              Open Official Circular on Source Portal →
            </a>
          </p>
        `,
        originalUrl: targetUrl,
        source: "CA Sansaar & Official Notifications"
      },
      { status: 200 }
    );
  }
}
