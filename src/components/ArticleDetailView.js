"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./ArticleDetailView.module.css";
import NewsSidebar from "./NewsSidebar";
import NewsModal from "./NewsModal";

export default function ArticleDetailView({ pageType = "news" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const targetUrl = searchParams.get("url");

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedSidebarNews, setSelectedSidebarNews] = useState(null);

  const isCircular = pageType === "notification";
  const pageTitle = isCircular ? "Notifications & Circulars" : "News & Events";
  const parentHref = isCircular ? "/#notifications" : "/#news";

  useEffect(() => {
    if (!targetUrl) {
      setError("No circular or news URL specified.");
      setLoading(false);
      return;
    }

    async function loadArticle() {
      try {
        setLoading(true);
        // Scroll to top smoothly when new article is loaded
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        const res = await fetch(`/api/news/detail?url=${encodeURIComponent(targetUrl)}`);
        if (!res.ok) {
          throw new Error("Unable to fetch article details");
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Failed to load article detail:", err);
        setError("Failed to retrieve article details from source server.");
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [targetUrl]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.innerWrap}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href={parentHref}>{pageTitle}</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>
            {article?.title || "Reading Article"}
          </span>
        </nav>

        {loading ? (
          <div className={styles.skeletonWrap}>
            <div className={styles.skeletonLine} style={{ width: "30%" }}></div>
            <div className={styles.skeletonLine} style={{ width: "80%", height: "36px" }}></div>
            <div className={styles.skeletonLine} style={{ width: "100%", height: "260px" }}></div>
            <div className={styles.skeletonLine} style={{ width: "100%" }}></div>
            <div className={styles.skeletonLine} style={{ width: "95%" }}></div>
            <div className={styles.skeletonLine} style={{ width: "90%" }}></div>
          </div>
        ) : error ? (
          <div className={styles.articleCard}>
            <div className={styles.metaHeader}>
              <span className={styles.badge} style={{ background: "#fef2f2", color: "#991b1b", borderColor: "#fecaca" }}>
                Notice
              </span>
            </div>
            <h1 className={styles.articleTitle}>Unable to Display Update</h1>
            <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
              {error} Please return to the homepage or verify the requested link.
            </p>
            <Link href="/" className={`${styles.toolBtn} ${styles.backBtn}`}>
              ← Return to Home Portal
            </Link>
          </div>
        ) : (
          <div className={styles.layoutGrid}>
            {/* Main Article Content */}
            <main className={styles.articleCard}>
              <div className={styles.metaHeader}>
                <span className={styles.badge}>{article?.category || "Official Update"}</span>
                <span className={styles.metaDate}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {article?.date || "Current Fiscal"}
                </span>
              </div>

              <h1 className={styles.articleTitle}>{article?.title}</h1>

              {/* Action Toolbar */}
              <div className={styles.toolbar}>
                <Link href="/" className={`${styles.toolBtn} ${styles.backBtn}`}>
                  ← Back to All Updates
                </Link>

                <div className={styles.toolbarActions}>
                  <button onClick={handlePrint} className={styles.toolBtn} title="Print circular">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="6 9 6 2 18 2 18 9"></polyline>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                      <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    Print
                  </button>

                  <button onClick={handleShare} className={styles.toolBtn} title="Share circular link">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    {copied ? "Link Copied!" : "Share"}
                  </button>
                </div>
              </div>

              {/* Banner Image */}
              {article?.image && (
                <div className={styles.bannerWrap}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.bannerImg}
                    loading="lazy"
                  />
                </div>
              )}

              {/* Render Full Body Article HTML */}
              <div
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: article?.contentHtml || "<p>No content available.</p>" }}
              />

              {/* Statutory Attribution Box */}
              <div className={styles.disclaimerBox}>
                <strong>Source & Attribution:</strong> This publication is compiled from public domain statutory circulars, gazettes, and updates courtesy of <em>{article?.source || "CA Sansaar"}</em> for informative and compliance reference of taxpayers and trade professionals.
              </div>
            </main>

            {/* Right Sidebar: Both Live News & Notification Scrollers */}
            <aside className={styles.sidebar}>
              <NewsSidebar onItemClick={(item) => setSelectedSidebarNews(item)} />
            </aside>
          </div>
        )}
      </div>

      {/* Modal Popup when clicking an item from the sidebar ticker */}
      {selectedSidebarNews && (
        <NewsModal
          newsItem={selectedSidebarNews}
          onClose={() => setSelectedSidebarNews(null)}
        />
      )}
    </div>
  );
}
