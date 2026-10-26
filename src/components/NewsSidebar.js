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

// Memory cache for sidebar translations
const sidebarNewsCache = { gu: null, hi: null };

export default function NewsSidebar({ onItemClick }) {
  const [news, setNews] = useState([]);
  const [translatedNews, setTranslatedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState("en");

  const translateSidebarList = async (items, lang) => {
    if (!items || items.length === 0 || lang === "en") return items;
    if (sidebarNewsCache[lang]) return sidebarNewsCache[lang];

    try {
      const titles = items.map((i) => i.title);
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: titles, targetLang: lang }),
      });
      if (res.ok) {
        const { translations } = await res.json();
        const translated = items.map((item, idx) => ({
          ...item,
          title: translations?.[idx] || item.title,
        }));
        sidebarNewsCache[lang] = translated;
        return translated;
      }
    } catch (err) {
      console.warn("Sidebar translation error:", err);
    }
    return items;
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("csk_active_language");
      if (saved && (saved === "gu" || saved === "hi")) {
        setCurrentLang(saved);
      }
    } catch (e) {}

    const handleLangChange = (e) => {
      const newLang = e.detail || "en";
      setCurrentLang(newLang);
      if (newLang === "en") {
        setTranslatedNews(null);
      } else if (news.length > 0) {
        translateSidebarList(news, newLang).then((t) => setTranslatedNews(t));
      }
    };

    window.addEventListener("appLanguageChanged", handleLangChange);
    return () => window.removeEventListener("appLanguageChanged", handleLangChange);
  }, [news]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data);

          const activeLang = typeof window !== "undefined"
            ? (localStorage.getItem("csk_active_language") || currentLang)
            : currentLang;

          if (activeLang && activeLang !== "en") {
            translateSidebarList(data, activeLang).then((t) => setTranslatedNews(t));
          }
        }
      } catch (error) {
        console.error("Failed to load news in sidebar:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [currentLang]);

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

  const activeItems = (currentLang !== "en" && translatedNews && translatedNews.length > 0)
    ? translatedNews
    : news;

  const newsAndEvents = useMemo(() => activeItems.filter(item => !isCircular(item)), [activeItems]);
  const notificationsCirculars = useMemo(() => activeItems.filter(item => isCircular(item)), [activeItems]);

  return (
    <aside className={styles.sidebar}>
      <TickerWidget
        title={currentLang === "gu" ? "સમાચાર અને ઘટનાઓ" : currentLang === "hi" ? "समाचार और घटनाएं" : "News & Events"}
        items={newsAndEvents}
        loading={loading}
        onItemClick={onItemClick}
      />
      <TickerWidget
        title={currentLang === "gu" ? "સૂચના / પરિપત્ર" : currentLang === "hi" ? "अधिसूचना / परिपत्र" : "Notification/Circular"}
        items={notificationsCirculars}
        loading={loading}
        onItemClick={onItemClick}
      />
    </aside>
  );
}
