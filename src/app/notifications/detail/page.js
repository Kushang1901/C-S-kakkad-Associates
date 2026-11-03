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
        .replace(/^(?:news|notification|circular)-(?:gst|income-tax|fema|sebi|mca|icai)?-?/i, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
  } catch (_) {}
  return "Statutory Circular & Notification";
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Statutory Circulars & Notifications";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/notifications/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/notifications/detail";

  return {
    title: `${title} | C S Kakkad & Associates`,
    description: `Official statutory circular, regulatory gazette notification, and compliance advisory on ${title}. Compiled by C S Kakkad & Associates.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | C S Kakkad & Associates`,
      description: `Official circulars and notifications from MCA, CBIC, CBDT, SEBI, and RBI.`,
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
      description: `Official regulatory circulars and notifications for Chartered Accountants and taxpayers.`,
      images: ["https://cachintankakkad.in/icon-512.png"],
    },
  };
}

export default async function NotificationDetailPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Official Statutory Circular";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/notifications/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/notifications/detail";

  const circularJsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentPermit",
    "@id": `${canonicalUrl}#notice`,
    name: title,
    description: `Official compliance notification and statutory circular monitored by C S Kakkad & Associates.`,
    provider: {
      "@type": "AccountingService",
      "@id": "https://cachintankakkad.in/#organization",
      name: "C S Kakkad & Associates",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(circularJsonLd) }}
      />
      <Suspense fallback={
        <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ height: "30px", width: "200px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
          <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
        </div>
      }>
        <ArticleDetailView pageType="notification" />
      </Suspense>
    </>
  );
}
