"use client";

import styles from "./EnquiryModal.module.css";
import EnquiryForm from "./EnquiryForm";

export default function EnquiryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>Book Consultation</h3>
        </div>
        
        <div className={styles.modalBody}>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
