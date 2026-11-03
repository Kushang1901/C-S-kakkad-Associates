export const revalidate = 3600; // Refresh sitemap every 1 hour

function cleanString(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
}

function isDateExpired(closingDateStr) {
  if (!closingDateStr) return false;
  const s = closingDateStr.toLowerCase().trim();
  if (s.includes("rolling") || s.includes("continuous") || s.includes("immediate") || s.includes("ongoing")) {
    return false;
  }
  const textMonthMatch = s.match(/([0-9]{1,2})[-\s/]+([a-z]{3,9})[-\s/]+([0-9]{4})/i);
  if (textMonthMatch) {
    const day = parseInt(textMonthMatch[1], 10);
    const monthStr = textMonthMatch[2].substring(0, 3).toLowerCase();
    const year = parseInt(textMonthMatch[3], 10);
    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    if (months[monthStr] !== undefined) {
      const deadline = new Date(year, months[monthStr], day, 23, 59, 59);
      if (!isNaN(deadline.getTime())) {
        return deadline.getTime() < Date.now();
      }
    }
  }
  return false;
}

async function fetchDynamicEmpanelmentLinks() {
  const links = [];
  try {
    const res = await fetch("https://www.casansaar.com/empanelment.html", {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(3500),
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const html = await res.text();
      const articleRegex = /<article[\s\S]*?<\/article>/gi;
      const arts = html.match(articleRegex) || [];
      for (const art of arts) {
        const linkMatch = art.match(/<h2[^>]*>\s*<a[^>]*href="([^"]+)"/i);
        const closeDateMatch = art.match(/Closing Date:<\/strong>\s*([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4}[^<]*)/i);
        const pubDateMatch = art.match(/schedule\.png"[^>]*>\s*&nbsp;([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4}[^<]*)/i);

        if (linkMatch) {
          const rawLink = linkMatch[1].trim();
          const fullLink = rawLink.startsWith("http") ? rawLink : `https://www.casansaar.com/${rawLink.replace(/^\//, "")}`;
          const closingDate = closeDateMatch ? cleanString(closeDateMatch[1]) : "";
          const pubDate = pubDateMatch ? new Date(cleanString(pubDateMatch[1])) : new Date();

          // Exclude expired tenders from sitemap to prevent 404/stale ranking penalties
          if (closingDate && isDateExpired(closingDate)) {
            continue;
          }

          links.push({
            url: fullLink,
            date: !isNaN(pubDate.getTime()) ? pubDate : new Date()
          });
        }
      }
    }
  } catch (err) {
    console.warn("Sitemap empanelment dynamic sync notice:", err.message);
  }
  return links;
}

async function fetchDynamicNewsLinks() {
  const links = [];
  try {
    const res = await fetch("https://www.casansaar.com/news.html", {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(3500),
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const html = await res.text();
      const articleRegex = /<article[\s\S]*?<\/article>/gi;
      const arts = html.match(articleRegex) || [];
      for (const art of arts.slice(0, 18)) {
        const linkMatch = art.match(/<h2[^>]*>\s*<a[^>]*href="([^"]+)"/i);
        const dateMatch = art.match(/([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{4})/i);

        if (linkMatch) {
          const rawLink = linkMatch[1].trim();
          const fullLink = rawLink.startsWith("http") ? rawLink : `https://www.casansaar.com/${rawLink.replace(/^\//, "")}`;
          const pubDate = dateMatch ? new Date(dateMatch[1]) : new Date();

          links.push({
            url: fullLink,
            date: !isNaN(pubDate.getTime()) ? pubDate : new Date()
          });
        }
      }
    }
  } catch (err) {
    console.warn("Sitemap news dynamic sync notice:", err.message);
  }
  return links;
}

export default async function sitemap() {
  const baseUrl = "https://cachintankakkad.in";

  // Core static & service routes with tailored SEO priorities
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/team", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/audit-assurance", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/gst", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/income-tax", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/business-finance-loan", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/consultancy", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/accounting-outsourcing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/empanelment", priority: 0.92, changeFrequency: "daily" },
    { path: "/calculators", priority: 0.85, changeFrequency: "weekly" },
    { path: "/useful-links", priority: 0.8, changeFrequency: "weekly" },
    { path: "/acts-rules", priority: 0.75, changeFrequency: "monthly" },
    { path: "/forms", priority: 0.8, changeFrequency: "weekly" },
    { path: "/cpe-status", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/enquiry", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vision", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mission", priority: 0.7, changeFrequency: "monthly" },
    { path: "/career", priority: 0.75, changeFrequency: "monthly" },
    { path: "/sitemap", priority: 0.85, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" },
  ];

  const staticEntries = routes.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Fetch dynamic content URLs
  const [empLinks, newsLinks] = await Promise.all([
    fetchDynamicEmpanelmentLinks(),
    fetchDynamicNewsLinks(),
  ]);

  // Dynamic Empanelment Tender Detail pages
  const dynamicEmpanelmentEntries = empLinks.map((item) => ({
    url: `${baseUrl}/empanelment/detail?url=${encodeURIComponent(item.url)}`,
    lastModified: item.date,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // Dynamic News Articles Detail pages
  const dynamicNewsEntries = newsLinks.map((item) => ({
    url: `${baseUrl}/news-events/detail?url=${encodeURIComponent(item.url)}`,
    lastModified: item.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Circulars & Notifications Detail pages
  const dynamicNotificationEntries = newsLinks.slice(0, 10).map((item) => ({
    url: `${baseUrl}/notifications/detail?url=${encodeURIComponent(item.url)}`,
    lastModified: item.date,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticEntries,
    ...dynamicEmpanelmentEntries,
    ...dynamicNewsEntries,
    ...dynamicNotificationEntries,
  ];
}
