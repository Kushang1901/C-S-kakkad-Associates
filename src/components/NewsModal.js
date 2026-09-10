import Link from "next/link";
import styles from "./NewsModal.module.css";

export default function NewsModal({ newsItem, item, onClose }) {
  const activeItem = newsItem || item;
  if (!activeItem) return null;

  const cat = (activeItem.category || "").toLowerCase();
  const title = (activeItem.title || "").toLowerCase();
  const isCircular =
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
    title.includes("regulations");

  const detailPath = isCircular
    ? `/notifications/detail?url=${encodeURIComponent(activeItem.link || "")}`
    : `/news-events/detail?url=${encodeURIComponent(activeItem.link || "")}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        <div className={styles.modalHeader}>
          <span className={styles.categoryBadge}>{activeItem.category}</span>
          <span className={styles.date}>{activeItem.date}</span>
        </div>
        
        <h3 className={styles.title}>{activeItem.title}</h3>
        
        <div className={styles.modalBody}>
          <p className={styles.content}>{activeItem.content}</p>
        </div>
        
        <div className={styles.modalFooter}>
          {activeItem.link ? (
            <Link 
              href={detailPath}
              onClick={onClose}
              className="btn btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 18px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              Read Full Article
              <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          ) : null}
          <button className="btn btn-outline" onClick={onClose} style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
