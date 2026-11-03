"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./empanelment.module.css";

const empanelmentSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://cachintankakkad.in/empanelment#webpage",
  url: "https://cachintankakkad.in/empanelment",
  name: "Institutional Empanelment & Audit Tenders | C S Kakkad & Associates",
  description: "Active bank concurrent audit empanelments, PSU tenders, and statutory audit opportunities compiled by C S Kakkad & Associates.",
  provider: {
    "@type": "AccountingService",
    "@id": "https://cachintankakkad.in/#organization",
    name: "C S Kakkad & Associates",
  },
};

const ITEMS_PER_PAGE = 6;

// Automatically detect if a tender closing date has passed
function isDateExpired(closingDateStr) {
  if (!closingDateStr) return false;
  const s = closingDateStr.toLowerCase().trim();

  // Continuous or rolling opportunities do not expire
  if (s.includes("rolling") || s.includes("continuous") || s.includes("immediate") || s.includes("ongoing")) {
    return false;
  }

  // DD MMM YYYY (e.g. "12 Nov 2026", "24 Nov 2026", "02 Nov 2026")
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

  // DD-MM-YYYY or DD/MM/YYYY (e.g. "13-11-2026", "30/11/2026")
  const numDateMatch = s.match(/([0-9]{1,2})[-\s/]+([0-9]{1,2})[-\s/]+([0-9]{4})/);
  if (numDateMatch) {
    const day = parseInt(numDateMatch[1], 10);
    const month = parseInt(numDateMatch[2], 10) - 1;
    const year = parseInt(numDateMatch[3], 10);
    const deadline = new Date(year, month, day, 23, 59, 59);
    if (!isNaN(deadline.getTime())) {
      return deadline.getTime() < Date.now();
    }
  }

  try {
    const parsed = new Date(closingDateStr);
    if (!isNaN(parsed.getTime())) {
      parsed.setHours(23, 59, 59, 999);
      return parsed.getTime() < Date.now();
    }
  } catch (_) {}

  return false;
}

export default function Empanelment() {
  const [empanelments, setEmpanelments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveEmpanelments() {
      try {
        const res = await fetch("/api/empanelment");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setEmpanelments(data);
          }
        }
      } catch (err) {
        console.warn("Live empanelment sync note:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveEmpanelments();
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  // Automatically filter out and delete expired / outdated tenders
  const activeEmpanelments = empanelments.filter(
    (item) => !isDateExpired(item.closingDate)
  );

  const filteredEmpanelments = activeCategory === "all"
    ? activeEmpanelments
    : activeEmpanelments.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredEmpanelments.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmpanelments = filteredEmpanelments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (typeof window !== "undefined") {
        const el = document.getElementById("empanelment-board");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const bankCount = activeEmpanelments.filter((item) => item.category === "bank").length;
  const psuCount = activeEmpanelments.filter((item) => item.category === "psu").length;
  const ddCount = activeEmpanelments.filter((item) => item.category === "due-diligence").length;

  return (
    <InnerPageLayout title="Institutional Empanelment & Tenders" breadcrumbs={[{ name: "Empanelment" }]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(empanelmentSchema) }}
      />

      {/* ── Section: Active Tender & Empanelment Opportunities Board ── */}
      <div id="empanelment-board" className={styles.tenderSectionHeader}>
        <div>
          <h3 className={styles.tenderSectionTitle}>Active Empanelment Notices &amp; Institutional Tenders</h3>
          <p className={styles.tenderSectionSubtitle}>
            Live professional opportunities across Indian public sector banks, co-operatives, PSUs, and government regulatory bodies for FY 2026-27.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterPills}>
          <button 
            className={`${styles.filterPill} ${activeCategory === "all" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            All Notices {!loading && `(${activeEmpanelments.length})`}
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "bank" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("bank")}
          >
            Bank Audits {!loading && bankCount > 0 && `(${bankCount})`}
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "psu" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("psu")}
          >
            PSU &amp; Government {!loading && psuCount > 0 && `(${psuCount})`}
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "due-diligence" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("due-diligence")}
          >
            Stock &amp; Due Diligence {!loading && ddCount > 0 && `(${ddCount})`}
          </button>
        </div>
      </div>

      {/* Tender List (2-Column Grid) */}
      <div className={styles.tenderList}>
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={styles.skeletonCard}>
              <div className={styles.skeletonLine} style={{ width: "35%", height: "18px" }} />
              <div className={styles.skeletonLine} style={{ width: "85%", height: "24px", margin: "14px 0 10px" }} />
              <div className={styles.skeletonLine} style={{ width: "100%", height: "36px" }} />
              <div className={styles.skeletonLine} style={{ width: "60%", height: "14px", marginTop: "16px" }} />
            </div>
          ))
        ) : filteredEmpanelments.length === 0 ? (
          <div style={{
            gridColumn: "1 / -1",
            padding: "40px 24px",
            textAlign: "center",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px dashed #cbd5e1",
            color: "#475569"
          }}>
            <h4 style={{ color: "var(--primary-color, #1a365d)", marginBottom: "8px", fontSize: "1.1rem" }}>
              No Outdated or Expired Notices
            </h4>
            <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>
              All notices with passed closing dates are automatically retired from this board. Active opportunities will appear here as soon as new circulars are released by banks and public corporations.
            </p>
          </div>
        ) : (
          paginatedEmpanelments.map((item) => {
            const detailHref = `/empanelment/detail?url=${encodeURIComponent(item.link)}`;
            return (
              <div key={item.id} className={styles.tenderCard}>
                <div className={styles.tenderCardTop}>
                  <span className={styles.tenderCategory}>
                    {item.categoryLabel || (item.category === "bank" ? "Commercial & Co-op Banks" : item.category === "psu" ? "PSU & Municipal Body" : "Stock Audit & Due Diligence")}
                  </span>

                  {item.status === "open" && <span className={`${styles.badge} ${styles.badgeOpen}`}>● {item.statusLabel || "Applications Open"}</span>}
                  {item.status === "rfp" && <span className={`${styles.badge} ${styles.badgeRfp}`}>● {item.statusLabel || "Active RFP"}</span>}
                  {item.status === "rolling" && <span className={`${styles.badge} ${styles.badgeRolling}`}>● {item.statusLabel || "Rolling Panel"}</span>}
                  {item.status === "upcoming" && <span className={`${styles.badge} ${styles.badgeUpcoming}`}>● {item.statusLabel || "Upcoming"}</span>}
                </div>

                <Link href={detailHref} className={styles.tenderTitle}>
                  {item.title}
                </Link>

                <p className={styles.tenderDesc}>{item.desc}</p>

                <div className={styles.tenderMeta}>
                  <span className={styles.metaItem}><strong>Published:</strong> {item.date}</span>
                  <span className={`${styles.metaItem} ${styles.deadlineHighlight}`}>
                    <strong>Closing / Last Date:</strong> {item.closingDate}
                  </span>
                  <Link href={detailHref} className={styles.btnReadMore}>
                    View Scope &amp; Eligibility
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination Controls ── */}
      {!loading && totalPages > 1 && (

<div className={styles.paginationWrap} aria-label="Empanelment Pagination">
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            « Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            Next »
          </button>

          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages} ({filteredEmpanelments.length} notices)
          </span>
        </div>
      )}
    </InnerPageLayout>
  );
}
