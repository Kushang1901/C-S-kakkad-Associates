import { Suspense } from "react";
import ArticleDetailView from "@/components/ArticleDetailView";

export const metadata = {
  title: "Circular & Notification Details | C S Kakkad & Associates",
  description: "Read full statutory regulatory circulars, notifications, and orders from MCA, SEBI, RBI, ICAI, and FEMA."
};

export default function NotificationDetailPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ height: "30px", width: "200px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
        <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
      </div>
    }>
      <ArticleDetailView pageType="notification" />
    </Suspense>
  );
}
