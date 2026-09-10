"use client";

import { useState, useEffect, useMemo } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./compliance-calendar.module.css";

export default function ComplianceCalendarPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeMonth, setActiveMonth] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dynamic compliance data from backend API
  useEffect(() => {
    async function loadComplianceData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/compliance");
        if (!res.ok) {
          throw new Error(`Failed to load compliance schedule: HTTP ${res.status}`);
        }
        const json = await res.json();
        setData(json);

        // Auto-select current month from server response
        if (json.currentMonth && json.months.includes(json.currentMonth)) {
          setActiveMonth(json.currentMonth);
        } else if (json.months && json.months.length > 0) {
          setActiveMonth(json.months[0]);
        }
      } catch (err) {
        console.error("Compliance API load error:", err);
        setError("Unable to load the compliance schedule. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadComplianceData();
  }, []);

  const months = data?.months || [];
  const categories = data?.categories || ["All", "GST", "Income Tax", "TDS / TCS", "MCA / ROC"];
  const allCompliances = data?.compliances || [];

  // Filter items dynamically by active month, category, and search query
  const filteredEvents = useMemo(() => {
    return allCompliances.filter((item) => {
      const matchMonth = item.month === activeMonth;
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.statutoryAct && item.statutoryAct.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchMonth && matchCategory && matchSearch;
    });
  }, [allCompliances, activeMonth, activeCategory, searchQuery]);

  // Metric counts for the selected month calculated on the fly
  const stats = useMemo(() => {
    const monthItems = allCompliances.filter((i) => i.month === activeMonth);
    return {
      total: monthItems.length,
      gst: monthItems.filter((i) => i.category === "GST").length,
      it: monthItems.filter((i) => i.category === "Income Tax").length,
      tds: monthItems.filter((i) => i.category === "TDS / TCS").length,
      mca: monthItems.filter((i) => i.category === "MCA / ROC").length,
    };
  }, [allCompliances, activeMonth]);

  return (
    <InnerPageLayout
      title="Compliance & Tax Due Dates Calendar"
      breadcrumbs={[{ name: "Compliance Calendar" }]}
    >
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Statutory Due Dates Calendar</h2>
          <p className={styles.subtitle}>
            Dynamically updated regulatory filing schedule across GST, Income Tax, TDS, and Corporate Law.
          </p>
        </div>
        <div className={styles.fyBadge}>
          <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
          </svg>
          Financial Year {data?.financialYear || "2026 - 2027"}
        </div>
      </div>

      {/* Month Bar */}
      <div className={styles.monthsScroll}>
        {months.map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.monthBtn} ${activeMonth === m ? styles.monthBtnActive : ""}`}
            onClick={() => setActiveMonth(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Dynamic Stats for the Selected Month */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{loading ? "..." : stats.total}</div>
          <div className={styles.statLabel}>Total Due</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: "#2E7D32" }}>{loading ? "..." : stats.gst}</div>
          <div className={styles.statLabel}>GST Returns</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: "#1565C0" }}>{loading ? "..." : stats.it}</div>
          <div className={styles.statLabel}>Income Tax</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: "#E65100" }}>{loading ? "..." : stats.tds}</div>
          <div className={styles.statLabel}>TDS / TCS</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: "#512DA8" }}>{loading ? "..." : stats.mca}</div>
          <div className={styles.statLabel}>MCA / ROC</div>
        </div>
      </div>

      {/* Controls: Category filter + Search */}
      <div className={styles.controlsRow}>
        <div className={styles.categoryPills}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.pillBtn} ${activeCategory === cat ? styles.pillBtnActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by form or tax obligation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Compliance Event Cards */}
      <div className={styles.eventsList}>
        {loading ? (
          <>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
          </>
        ) : error ? (
          <div className={styles.emptyNotice}>
            <p style={{ margin: 0, fontWeight: "600", color: "#C62828" }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-outline" 
              style={{ marginTop: "12px", fontSize: "0.85rem" }}
            >
              Retry
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <div key={item.id} className={styles.complianceCard}>
              <div className={styles.dateBox}>
                <div className={styles.dateDay}>{item.day}</div>
                <div className={styles.dateMonth}>{item.month.slice(0, 3)}</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={`${styles.categoryTag} ${styles[item.tagClass]}`}>
                    {item.category}
                  </span>
                  {item.statutoryAct && (
                    <span className={styles.actTag}>
                      {item.statutoryAct}
                    </span>
                  )}
                  {item.rolledOver && (
                    <span className={styles.rolloverTag}>
                      Shifted from {item.originalDay}th (Sunday)
                    </span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.cardNote}>
                  <svg style={{ width: "14px", height: "14px", color: "#C62828", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span>
                    <strong>Non-Compliance Penalty:</strong> {item.penalty}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyNotice}>
            <svg style={{ width: "40px", height: "40px", color: "var(--text-muted)", marginBottom: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p style={{ margin: 0, fontWeight: "600" }}>No compliance items matching your filter for {activeMonth}.</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem" }}>Try switching categories or clearing search keywords.</p>
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
}
