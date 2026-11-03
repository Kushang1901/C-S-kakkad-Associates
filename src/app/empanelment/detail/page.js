import { Suspense } from "react";
import ArticleDetailView from "@/components/ArticleDetailView";

export const metadata = {
  title: "Empanelment Notice & Tender Scope | C S Kakkad & Associates",
  description: "Official empanelment notice, eligibility guidelines, submission deadlines, and scope of audit assignments for Chartered Accountants.",
  alternates: {
    canonical: "https://cachintankakkad.in/empanelment/detail",
  },
};

export default function EmpanelmentDetailPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "60px 20px", maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ height: "30px", width: "240px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "20px" }}></div>
        <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "12px" }}></div>
      </div>
    }>
      <ArticleDetailView pageType="empanelment" />
    </Suspense>
  );
}
