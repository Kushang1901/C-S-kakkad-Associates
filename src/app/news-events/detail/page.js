import { Suspense } from "react";
import ArticleDetailView from "@/components/ArticleDetailView";

export const metadata = {
  title: "Tax & Compliance News Updates | C S Kakkad & Associates",
  description: "Read authoritative updates on Income Tax rulings, GST council circulars, MCA notifications, and ICAI announcements.",
  alternates: {
    canonical: "https://www.cachintankakkad.in/news-events/detail",
  },
};

export default function NewsDetailPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ height: "30px", width: "200px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
        <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
      </div>
    }>
      <ArticleDetailView pageType="news" />
    </Suspense>
  );
}
