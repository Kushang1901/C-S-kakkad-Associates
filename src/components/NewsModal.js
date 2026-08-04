import styles from "./NewsModal.module.css";

export default function NewsModal({ newsItem, item, onClose }) {
  const activeItem = newsItem || item;
  if (!activeItem) return null;

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
          {activeItem.link && (
            <a 
              href={activeItem.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              Read Full Article
              <svg style={{ width: "12px", height: "12px", marginLeft: "6px", display: "inline-block" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          )}
          <button className="btn btn-outline" onClick={onClose} style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
