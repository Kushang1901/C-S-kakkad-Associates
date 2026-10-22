import InnerPageLayout from "@/components/InnerPageLayout";
import SitemapClient from "./SitemapClient";

export const metadata = {
  title: "Sitemap & Website Directory | C S Kakkad & Associates Chartered Accountants",
  description: "Navigate all pages, audit & tax services, corporate finance solutions, financial calculators, forms, and credentials of C S Kakkad & Associates, Dwarka.",
  keywords: [
    "C S Kakkad sitemap",
    "CA Chintan Kakkad site directory",
    "Dwarka CA firm sitemap",
    "Chartered Accountant services directory",
    "cachintankakkad sitemap xml",
  ],
  alternates: {
    canonical: "https://www.cachintankakkad.in/sitemap",
  },
  openGraph: {
    title: "Sitemap | C S Kakkad & Associates",
    description: "Complete navigation index of all auditing, taxation, GST, and business loan services offered by C S Kakkad & Associates.",
    url: "https://www.cachintankakkad.in/sitemap",
    type: "website",
    images: ["/icon-512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap & Site Directory | C S Kakkad & Associates",
    description: "Explore the complete directory of our chartered accountancy services and financial tools.",
    images: ["/icon-512.png"],
  },
};

export default function SitemapPage() {
  return (
    <InnerPageLayout
      title="Sitemap"
      breadcrumbs={[{ name: "Sitemap", path: "/sitemap" }]}
    >
      <SitemapClient />
    </InnerPageLayout>
  );
}
