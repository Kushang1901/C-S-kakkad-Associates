"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./NewsSidebar.module.css";

function TickerWidget({ title, items, loading, onItemClick }) {
  const listRef = useRef(null);
  const [duration, setDuration] = useState(24);

  // Duplicate list an even number of times so -50% translation is mathematically seamless
  const scrollList = useMemo(() => {
    if (!items || items.length === 0) return [];
    const minItems = 8;
    const factor = Math.max(2, Math.ceil(minItems / items.length));
    const evenFactor = factor % 2 === 0 ? factor : factor + 1;
    return Array(evenFactor).fill(items).flat();
  }, [items]);

  useEffect(() => {
    if (!listRef.current || scrollList.length === 0) return;

    const calculateSpeed = () => {
      if (!listRef.current) return;
      const fullHeight = listRef.current.scrollHeight;
      const distance = fullHeight / 2; // Since translateY travels -50%
      // 22 pixels per second: optimal comfortable reading speed
      const SPEED_PX_PER_SEC = 22;
      const computed = Math.max(distance / SPEED_PX_PER_SEC, 8);
      setDuration(computed);
    };

    calculateSpeed();

    const resizeObserver = new ResizeObserver(() => {
      calculateSpeed();
    });
    resizeObserver.observe(listRef.current);

    return () => resizeObserver.disconnect();
  }, [scrollList]);

  return (
    <div className={styles.widget}>
      <h3 className={styles.widgetTitle}>{title}</h3>
      <div className={styles.marqueeContainer}>
        {loading ? (
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyItem}>
            No active updates. Check back later.
          </div>
        ) : (
          <div
            ref={listRef}
            className={`${styles.marqueeList} ${styles.animateScroll}`}
            style={{ animationDuration: `${duration}s` }}
          >
            {scrollList.map((item, idx) => (
              <div
                key={`${item.id}_${idx}`}
                className={styles.tickerItem}
                onClick={() => onItemClick(item)}
              >
                <span className={styles.itemDate}>{item.date}</span>
                <h4 className={styles.itemTitle}>{item.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
      cat.includes("mca") ||
      cat.includes("sebi") ||
      cat.includes("ibbi") ||
      cat.includes("icai") ||
      title.includes("notification") ||
      title.includes("circular") ||
      title.includes("guidelines") ||
      title.includes("handbook") ||
      title.includes("regulations")
    );
  };

  const newsAndEvents = useMemo(() => news.filter(item => !isCircular(item)), [news]);
  const notificationsCirculars = useMemo(() => news.filter(item => isCircular(item)), [news]);

  return (
    <aside className={styles.sidebar}>
      <TickerWidget
        title="News & Events"
        items={newsAndEvents}
        loading={loading}
        onItemClick={onItemClick}
      />
      <TickerWidget
        title="Notification/Circular"
        items={notificationsCirculars}
        loading={loading}
        onItemClick={onItemClick}
      />
    </aside>
  );
}
