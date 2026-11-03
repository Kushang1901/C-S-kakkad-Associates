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
        .replace(/^(?:empanelment|tender)-/i, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
  } catch (_) {}
  return "Institutional Audit Empanelment Notice";
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Institutional Empanelment & Tenders";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/empanelment/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/empanelment/detail";

  return {
    title: `${title} | C S Kakkad & Associates`,
    description: `Official assignment scope, eligibility parameters, and submission timelines for ${title}. Monitored by the Institutional Audit Practice at C S Kakkad & Associates.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | C S Kakkad & Associates`,
      description: `Review official empanelment terms, closing dates, and audit criteria for ${title}.`,
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
      description: `Official empanelment notice and scope of audit assignments for Chartered Accountants in Gujarat.`,
      images: ["https://cachintankakkad.in/icon-512.png"],
    },
  };
}

export default async function EmpanelmentDetailPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const targetUrl = resolvedParams?.url;
  const title = targetUrl ? formatSlugToTitle(targetUrl) : "Institutional Empanelment Notice";
  const canonicalUrl = targetUrl
    ? `https://cachintankakkad.in/empanelment/detail?url=${encodeURIComponent(targetUrl)}`
    : "https://cachintankakkad.in/empanelment/detail";

  const tenderJsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "@id": `${canonicalUrl}#service`,
    name: title,
    description: `Official institutional empanelment and audit opportunity monitored by C S Kakkad & Associates.`,
    provider: {
      "@type": "AccountingService",
      "@id": "https://cachintankakkad.in/#organization",
      name: "C S Kakkad & Associates",
    },
    areaServed: {
      "@type": "State",
      name: "Gujarat, India",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tenderJsonLd) }}
      />
      <Suspense fallback={
        <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ height: "30px", width: "240px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
          <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
        </div>
      }>
        <ArticleDetailView pageType="empanelment" />
      </Suspense>
    </>
  );
}
