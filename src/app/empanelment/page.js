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

const initialEmpanelments = [
  {
    id: "initial_1",
    title: "Public Sector Banks — Concurrent & Revenue Audit Empanelment (FY 2026-27)",
    category: "bank",
    categoryLabel: "Commercial & Co-op Banks",
    date: "02 Nov 2026",
    closingDate: "28 Nov 2026",
    status: "open",
    statusLabel: "Applications Open",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Empanelment of experienced Chartered Accountant partnership firms and sole practitioners for concurrent audit and revenue leakage inspection across regional branches in Gujarat and western zones."
  },
  {
    id: "initial_2",
    title: "State Co-operative Banks & Credit Societies — Statutory & Information System Audit",
    category: "bank",
    categoryLabel: "Commercial & Co-op Banks",
    date: "01 Nov 2026",
    closingDate: "24 Nov 2026",
    status: "open",
    statusLabel: "Applications Open",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Inviting applications from qualified CA firms for conducting statutory audit and Information System (IS) security audits for district central co-operative banks and urban co-operative credit societies."
  },
  {
    id: "initial_3",
    title: "Power & Infrastructure Public Corporation — Internal Audit & Fixed Asset Physical Verification",
    category: "psu",
    categoryLabel: "PSU & Municipal Body",
    date: "28 Oct 2026",
    closingDate: "20 Nov 2026",
    status: "open",
    statusLabel: "Applications Open",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Appointment of CA/CMA firms for internal audit, fixed asset tagging, and physical inventory verification across multiple regional operational substations for FY 2026-27."
  },
  {
    id: "initial_4",
    title: "Commercial Banks & Consortiums — Stock & Book Debt Audit Panel for SME & Corporate Borrowers",
    category: "due-diligence",
    categoryLabel: "Stock Audit & Due Diligence",
    date: "26 Oct 2026",
    closingDate: "31 Dec 2026",
    status: "rolling",
    statusLabel: "Rolling Panel",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Empanelment of independent Chartered Accountants for conducting periodic Stock, Book Debt, and Credit Monitoring Arrangement (CMA) inspections for borrowers with working capital limits above ₹1 Crore."
  },
  {
    id: "initial_5",
    title: "Municipal Corporation & Urban Development Authorities — Statutory Financial Audit",
    category: "psu",
    categoryLabel: "PSU & Municipal Body",
    date: "25 Oct 2026",
    closingDate: "18 Nov 2026",
    status: "open",
    statusLabel: "Applications Open",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Expressions of Interest (EOI) invited from CA firms for statutory audit of municipal financial statements, accrual-based accounting review, and central/state grant utilization certification."
  },
  {
    id: "initial_6",
    title: "Insolvency & Restructuring Due Diligence Support Panel (IBC Framework)",
    category: "due-diligence",
    categoryLabel: "Stock Audit & Due Diligence",
    date: "20 Oct 2026",
    closingDate: "15 Dec 2026",
    status: "rolling",
    statusLabel: "Rolling Panel",
    link: "https://www.casansaar.com/empanelment.html",
    desc: "Notice inviting experienced CA firms for financial due diligence, forensic transaction audit (PUFE transactions under IBC Section 43, 45, 50, 66), and business valuation of distressed corporate debtors."
  }
];

const ITEMS_PER_PAGE = 6;

export default function Empanelment() {
  const [empanelments, setEmpanelments] = useState(initialEmpanelments);
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

  const filteredEmpanelments = activeCategory === "all"
    ? empanelments
    : empanelments.filter((item) => item.category === activeCategory);

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

  const bankCount = empanelments.filter((item) => item.category === "bank").length;
  const psuCount = empanelments.filter((item) => item.category === "psu").length;
  const ddCount = empanelments.filter((item) => item.category === "due-diligence").length;

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
            All Notices ({empanelments.length})
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "bank" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("bank")}
          >
            Bank Audits {bankCount > 0 && `(${bankCount})`}
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "psu" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("psu")}
          >
            PSU &amp; Government {psuCount > 0 && `(${psuCount})`}
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "due-diligence" ? styles.filterPillActive : ""}`}
            onClick={() => handleCategoryChange("due-diligence")}
          >
            Stock &amp; Due Diligence {ddCount > 0 && `(${ddCount})`}
          </button>
        </div>
      </div>

      {/* Tender List (2-Column Grid) */}
      <div className={styles.tenderList}>
        {paginatedEmpanelments.map((item) => {
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
        })}
      </div>

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
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
