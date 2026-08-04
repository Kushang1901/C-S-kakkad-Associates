"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./InnerPageLayout.module.css";
import NewsSidebar from "./NewsSidebar";
import NewsModal from "./NewsModal";

export default function InnerPageLayout({ title, breadcrumbs = [], children }) {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <div>
      {/* Reusable Banner */}
      <div className={styles.pageBanner}>
        <div className="container">
          <h1 className={styles.bannerTitle}>{title}</h1>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {crumb.path ? (
                  <Link href={crumb.path}>{crumb.name}</Link>
                ) : (
                  <span>{crumb.name}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className={styles.separator}>/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reusable Grid Content */}
      <div className="section" style={{ backgroundColor: "var(--bg-light)" }}>
        <div className="container">
          <div className={styles.layoutGrid}>
            {/* Left Column: Page Content */}
            <article className={styles.mainContent}>
              {children}
            </article>

            {/* Right Column: Sidebar */}
            <aside>
              <NewsSidebar onItemClick={(item) => setSelectedNews(item)} />
            </aside>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedNews && (
        <NewsModal newsItem={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}
