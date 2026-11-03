import { Suspense } from "react";
import ArticleDetailView from "@/components/ArticleDetailView";

function formatSlugToTitle(urlStr) {
  try {
    const parsed = new URL(urlStr);
    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    const slug = pathSegments.find((s) => s.length > 5 && !s.endsWith(".html")) || pathSegments[pathSegments.length - 1];
    if (slug) {
      return slug
        .replace(/\.html$/i, "")
        .replace(/^news-(?:gst|income-tax|fema|sebi|mca|icai)?-?/i, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
  } catch (_) {}
  return "Tax & Statutory News Update";
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Tax & Compliance News Updates";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/news-events/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/news-events/detail";

  return {
    title: `${title} | C S Kakkad & Associates`,
    description: `Read authoritative analysis and circular coverage on ${title}. Published for taxpayers and corporate compliance by C S Kakkad & Associates.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | C S Kakkad & Associates`,
      description: `Authoritative statutory updates on Income Tax, GST, MCA, and corporate law.`,
      url: canonicalUrl,
      siteName: "C S Kakkad & Associates",
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: "https://cachintankakkad.in/icon-512.png",
          width: 512,
          height: 512,
          alt: "C S Kakkad & Associates Chartered Accountants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | C S Kakkad & Associates`,
      description: `Read authoritative statutory updates and tax analysis by C S Kakkad & Associates.`,
      images: ["https://cachintankakkad.in/icon-512.png"],
    },
  };
}

export default async function NewsDetailPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Tax & Regulatory Update";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/news-events/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/news-events/detail";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    url: canonicalUrl,
    publisher: {
      "@type": "AccountingService",
      "@id": "https://cachintankakkad.in/#organization",
      name: "C S Kakkad & Associates",
      logo: {
        "@type": "ImageObject",
        url: "https://cachintankakkad.in/icon-512.png",
      },
    },
    author: {
      "@type": "Organization",
      name: "C S Kakkad & Associates Editorial Desk",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Suspense fallback={
        <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ height: "30px", width: "200px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
          <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
        </div>
      }>
        <ArticleDetailView pageType="news" />
      </Suspense>
    </>
  );
}
