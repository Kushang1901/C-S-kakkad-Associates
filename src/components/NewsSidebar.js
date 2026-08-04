"use client";

import { useState, useEffect } from "react";
import styles from "./NewsSidebar.module.css";

export default function NewsSidebar({ onItemClick }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to load news in sidebar:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Classify news items
  const isCircular = (item) => {
    const cat = (item.category || "").toLowerCase();
    const title = (item.title || "").toLowerCase();
    return (
      cat.includes("circular") || 
      cat.includes("notification") || 
      cat.includes("rule") || 
      cat.includes("act") || 
      cat.includes("company law") ||
      cat.includes("corporate law") ||
      cat.includes("fema") ||
      cat.includes("rbi") ||
      title.includes("notification") ||
      title.includes("circular")
    );
  };

  const newsAndEvents = news.filter(item => !isCircular(item));
  const notificationsCirculars = news.filter(item => isCircular(item));

  // Duplicating items for seamless infinite marquee scroll
  const renderMarqueeItems = (items) => {
    if (items.length === 0) {
      return (
        <div className={styles.emptyItem}>
          No active updates. Check back later.
        </div>
      );
    }
    
    // Duplicate array to ensure it fills the scroll area and wraps cleanly
    const scrollList = [...items, ...items];
    
    return scrollList.map((item, idx) => (
      <div 
        key={`${item.id}_${idx}`} 
        className={styles.tickerItem} 
        onClick={() => onItemClick(item)}
      >
        <span className={styles.itemDate}>{item.date}</span>
        <h4 className={styles.itemTitle}>{item.title}</h4>
      </div>
    ));
  };

  return (
    <aside className={styles.sidebar}>
      {/* Section 1: News & Events */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>News & Events</h3>
        <div className={styles.marqueeContainer}>
          {loading ? (
            <div className={styles.skeletonContainer}>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
            </div>
          ) : (
            <div className={`${styles.marqueeList} ${styles.animateScroll}`}>
              {renderMarqueeItems(newsAndEvents)}
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Notification / Circular */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Notification/Circular</h3>
        <div className={styles.marqueeContainer}>
          {loading ? (
            <div className={styles.skeletonContainer}>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
            </div>
          ) : (
            <div className={`${styles.marqueeList} ${styles.animateScroll}`}>
              {renderMarqueeItems(notificationsCirculars)}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
