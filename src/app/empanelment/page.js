"use client";

import { useState } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./empanelment.module.css";

const empanelmentSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://cachintankakkad.in/empanelment#webpage",
  url: "https://cachintankakkad.in/empanelment",
  name: "Institutional Empanelment & Audit Tenders | C S Kakkad & Associates",
  description: "Official empanelment credentials, bank audit qualifications, and live institutional tender opportunities for Chartered Accountants in Gujarat.",
  provider: {
    "@type": "AccountingService",
    "@id": "https://cachintankakkad.in/#organization",
    name: "C S Kakkad & Associates",
  },
};

export default function Empanelment() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTender, setSelectedTender] = useState(null);

  const empanelments = [
    {
      id: 9101,
      category: "bank",
      title: "Public Sector Banks — Concurrent & Revenue Audit Empanelment (Q4 FY 2026-27)",
      date: "01 Nov 2026",
      closingDate: "28 Nov 2026",
      status: "open",
      statusLabel: "Applications Open",
      desc: "Empanelment of experienced Chartered Accountant partnership firms and sole practitioners for concurrent audit and revenue leakage inspection across regional branches in Gujarat and western zones.",
      scope: [
        "Daily/monthly checking of commercial advances, cash reserves, and vault operations.",
        "Verification of loan documentation, KYC/AML compliance, and credit rating norms.",
        "Early detection of NPAs, revenue leakage, and reporting in prescribed RBI formats.",
      ],
      eligibility: "Firms with minimum 3 to 5 years standing, DISA/CISA qualified partners/staff, clean track record with commercial banks.",
      pdfLink: "/empanelment-bank-internal.pdf",
    },
    {
      id: 9102,
      category: "bank",
      title: "State Co-operative Banks & Credit Societies — Statutory & Information System Audit",
      date: "28 Oct 2026",
      closingDate: "20 Nov 2026",
      status: "open",
      statusLabel: "Applications Open",
      desc: "Inviting applications from qualified CA firms for conducting statutory audit and Information System (IS) security audits for district central co-operative banks and urban co-operative credit societies.",
      scope: [
        "Statutory audit under Gujarat Co-operative Societies Act and RBI guidelines.",
        "Core Banking Solution (CBS) vulnerability, data security, and IT general controls (ITGC) review.",
        "Audit of credit limits, priority sector lending, and statutory liquidity ratio (SLR/CRR) compliance.",
      ],
      eligibility: "Chartered Accountants with DISA/CISA qualification and prior co-operative banking audit experience in Gujarat.",
      pdfLink: "/empanelment-is-audit.pdf",
    },
    {
      id: 9103,
      category: "psu",
      title: "Power & Infrastructure Public Corporation — Internal Audit & Fixed Asset Physical Verification",
      date: "25 Oct 2026",
      closingDate: "18 Nov 2026",
      status: "rfp",
      statusLabel: "Active RFP",
      desc: "Request for Proposal (RFP) for appointment of CA/CMA firms for internal audit, fixed asset tagging, and physical inventory verification across multiple regional operational substations for FY 2026-27 & 2027-28.",
      scope: [
        "Physical verification and reconciliation of plant & machinery, substations, and transmission assets with SAP fixed asset register.",
        "Internal operational controls review, procurement audit, and store inventory tally.",
        "Statutory compliances review including TDS, GST TDS, and labour laws.",
      ],
      eligibility: "Partnership / LLP CA firms with minimum 5 years standing and experience in PSU / infrastructure internal audits.",
      pdfLink: "/empanelment-internal-audit.pdf",
    },
    {
      id: 9104,
      category: "due-diligence",
      title: "Commercial Banks & Consortiums — Stock & Book Debt Audit Panel for SME & Corporate Borrowers",
      date: "15 Oct 2026",
      closingDate: "31 Dec 2026",
      status: "rolling",
      statusLabel: "Rolling Panel",
      desc: "Empanelment of independent Chartered Accountants for conducting periodic Stock, Book Debt, and Credit Monitoring Arrangement (CMA) inspections for borrowers with working capital limits above ₹1 Crore.",
      scope: [
        "Physical inventory verification, valuation of raw materials, work-in-progress, and finished goods.",
        "Ageing analysis of sundry debtors and calculation of Drawing Power (DP).",
        "Verification of insurance policies, charge registration with ROC, and bank statements.",
      ],
      eligibility: "Sole proprietorship or partnership CA firms with active practice in industrial and trading hubs.",
      pdfLink: "/empanelment-due-diligence.pdf",
    },
    {
      id: 9105,
      category: "psu",
      title: "Municipal Corporation & Urban Development Authorities — Statutory Financial Audit",
      date: "02 Nov 2026",
      closingDate: "30 Nov 2026",
      status: "open",
      statusLabel: "Applications Open",
      desc: "Expressions of Interest (EOI) invited from CA firms for statutory audit of municipal financial statements, accrual-based accounting review, and central/state grant utilization certification.",
      scope: [
        "Audit of municipal accounts under National Municipal Accounting Manual (NMAM).",
        "Verification of revenue receipts (Property Tax, Water Charges, Town Planning Fees).",
        "Certification of grant utilization under central/state urban development schemes.",
      ],
      eligibility: "CAG empanelled CA firms with head/branch office in Gujarat.",
      pdfLink: "/empanelment-financial-audit.pdf",
    },
    {
      id: 9106,
      category: "due-diligence",
      title: "Insolvency & Restructuring Due Diligence Support Panel (IBC Framework)",
      date: "20 Oct 2026",
      closingDate: "15 Dec 2026",
      status: "rolling",
      statusLabel: "Rolling Panel",
      desc: "Notice inviting experienced CA firms for financial due diligence, forensic transaction audit (PUFE transactions under IBC Section 43, 45, 50, 66), and business valuation of distressed corporate debtors.",
      scope: [
        "Comprehensive forensic scrutiny of historical ledger accounts and bank statements.",
        "Identification of preferential, undervalued, fraudulent, and extortionate credit transactions.",
        "Preparation of independent financial viability and resolution review reports.",
      ],
      eligibility: "Chartered Accountants with specialized practice in corporate litigation, direct tax representation, or forensic audit.",
      pdfLink: "/empanelment-tender-document.pdf",
    },
    {
      id: 9107,
      category: "psu",
      title: "Comptroller & Auditor General (CAG) Panel Pre-Registration & Annual MEF Advisory",
      date: "01 Nov 2026",
      closingDate: "15 Jan 2027",
      status: "upcoming",
      statusLabel: "Upcoming Cycle",
      desc: "Information notice regarding eligibility guidelines, point calculation framework, and documentation requirements for the upcoming annual CAG & Multipurpose Empanelment (MEF) cycle.",
      scope: [
        "Categorization rules for Statutory Central Auditors (SCA) and Statutory Branch Auditors (SBA).",
        "Documentation checklists for experience certificates, partner seniority, and staff strength.",
        "Guidelines on UDIN generation and submission for empanelment proofs.",
      ],
      eligibility: "All practicing CA firms registered with ICAI looking to qualify or upgrade CAG / RBI panel categorization.",
      pdfLink: "/empanelment-statutory-audit.pdf",
    },
    {
      id: 9108,
      category: "due-diligence",
      title: "State Tax Authorities — Special Audits under Section 66 (CGST & GGST Acts)",
      date: "10 Oct 2026",
      closingDate: "10 Dec 2026",
      status: "rolling",
      statusLabel: "Rolling Panel",
      desc: "Nomination panel of Chartered Accountants by the Commissioner of State/Central Tax for undertaking specialized audits where revenue interests or complexity of accounts warrant independent audit.",
      scope: [
        "In-depth reconciliation of GSTR-3B vs GSTR-2B Input Tax Credit (ITC) claims.",
        "Scrutiny of turnover declarations, inverted duty structures, and export refunds.",
        "Submission of comprehensive audit reports within statutory time limits to the tax authority.",
      ],
      eligibility: "Practicing Chartered Accountants with minimum 7 years post-qualification tax practice experience.",
      pdfLink: "/empanelment-financial-services.pdf",
    },
  ];

  const filteredEmpanelments = activeCategory === "all"
    ? empanelments
    : empanelments.filter(item => item.category === activeCategory);

  return (
    <InnerPageLayout title="Institutional Empanelment & Tenders" breadcrumbs={[{ name: "Empanelment" }]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(empanelmentSchema) }}
      />

      {/* ── Section 1: Firm's Institutional Empanelment Credentials ── */}
      <section className={styles.credentialsSection}>
        <div className={styles.credentialsHeader}>
          <div>
            <span className={styles.firmBadge}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              ICAI Member Firm · Est. 2014
            </span>
            <h2 className={styles.credentialsTitle}>Institutional Audit &amp; Empanelment Credentials</h2>
            <p className={styles.credentialsSubtitle}>
              <strong>C S Kakkad &amp; Associates</strong> is structured to provide rigorous, independent, and technology-driven audit services for nationalized banks, cooperative credit institutions, public corporations, and commercial lenders across Gujarat.
            </p>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Years Practice Standing</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>F.C.A.</span>
            <span className={styles.statLabel}>Fellow CA Leadership</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>UDIN &amp; ICAI Compliance</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>Gujarat</span>
            <span className={styles.statLabel}>Statewide Audit Presence</span>
          </div>
        </div>

        {/* 4 Pillars of Institutional Audit Practice */}
        <div className={styles.capabilitiesGrid}>
          <div className={styles.capabilityCard}>
            <h4 className={styles.capabilityTitle}>
              <svg width="18" height="18" fill="#dd6d27" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
              Bank Concurrent &amp; Statutory Audits
            </h4>
            <p className={styles.capabilityDesc}>
              Daily and periodic scrutiny of branch advances, KYC/AML controls, revenue leakages, and compliance with RBI Master Directions and Long Form Audit Reports (LFAR).
            </p>
          </div>
          <div className={styles.capabilityCard}>
            <h4 className={styles.capabilityTitle}>
              <svg width="18" height="18" fill="#dd6d27" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" clipRule="evenodd" /></svg>
              Stock &amp; Book Debt Inspections
            </h4>
            <p className={styles.capabilityDesc}>
              Independent physical inventory verification, debtor ageing analysis, and drawing power (DP) certifications for commercial working capital limits from ₹1 Cr to ₹50 Cr.
            </p>
          </div>
          <div className={styles.capabilityCard}>
            <h4 className={styles.capabilityTitle}>
              <svg width="18" height="18" fill="#dd6d27" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" /></svg>
              Due Diligence &amp; TEV Viability Studies
            </h4>
            <p className={styles.capabilityDesc}>
              Comprehensive financial investigations, Techno-Economic Viability (TEV) analysis, borrower credit appraisals, and forensic transaction scrutiny for consortium lenders.
            </p>
          </div>
          <div className={styles.capabilityCard}>
            <h4 className={styles.capabilityTitle}>
              <svg width="18" height="18" fill="#dd6d27" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
              PSU, Municipal &amp; Grant Audits
            </h4>
            <p className={styles.capabilityDesc}>
              Double-entry accrual financial accounting audits, fixed asset verification registers, and central/state government grant utilization certificate (UC) attestations.
            </p>
          </div>
        </div>

        {/* Institutional Invitation CTA */}
        <div className={styles.inviteBox}>
          <div className={styles.inviteText}>
            <h4>Invite C S Kakkad &amp; Associates for Empanelment</h4>
            <p>Banks, PSUs, and institutions seeking to empanel our firm or issue an audit Request for Proposal (RFP) can connect directly with our senior audit desk.</p>
          </div>
          <div className={styles.inviteBtnGroup}>
            <Link href="/enquiry" className={styles.btnRfp}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              Submit Empanelment / RFP
            </Link>
            <a href="mailto:info@cachintankakkad.in" className={styles.btnContact}>
              info@cachintankakkad.in
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Active Tender & Empanelment Opportunities Board ── */}
      <div className={styles.tenderSectionHeader}>
        <div>
          <h3 className={styles.tenderSectionTitle}>Active Empanelment Notices &amp; Institutional Tenders</h3>
          <p className={styles.tenderSectionSubtitle}>
            Current opportunities across Indian public sector banks, co-operatives, PSUs, and government regulatory bodies for FY 2026-27.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterPills}>
          <button 
            className={`${styles.filterPill} ${activeCategory === "all" ? styles.filterPillActive : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Notices ({empanelments.length})
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "bank" ? styles.filterPillActive : ""}`}
            onClick={() => setActiveCategory("bank")}
          >
            Bank Audits
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "psu" ? styles.filterPillActive : ""}`}
            onClick={() => setActiveCategory("psu")}
          >
            PSU &amp; Government
          </button>
          <button 
            className={`${styles.filterPill} ${activeCategory === "due-diligence" ? styles.filterPillActive : ""}`}
            onClick={() => setActiveCategory("due-diligence")}
          >
            Stock &amp; Due Diligence
          </button>
        </div>
      </div>

      {/* Tender List */}
      <div className={styles.tenderList}>
        {filteredEmpanelments.map((item) => (
          <div key={item.id} className={styles.tenderCard}>
            <div className={styles.tenderCardTop}>
              <span className={styles.tenderCategory}>
                {item.category === "bank" ? "Commercial & Co-op Banks" : item.category === "psu" ? "PSU & Municipal Body" : "Stock Audit & Due Diligence"}
              </span>

              {item.status === "open" && <span className={`${styles.badge} ${styles.badgeOpen}`}>● {item.statusLabel}</span>}
              {item.status === "rfp" && <span className={`${styles.badge} ${styles.badgeRfp}`}>● {item.statusLabel}</span>}
              {item.status === "rolling" && <span className={`${styles.badge} ${styles.badgeRolling}`}>● {item.statusLabel}</span>}
              {item.status === "upcoming" && <span className={`${styles.badge} ${styles.badgeUpcoming}`}>● {item.statusLabel}</span>}
            </div>

            <h4 className={styles.tenderTitle} onClick={() => setSelectedTender(item)}>
              {item.title}
            </h4>

            <p className={styles.tenderDesc}>{item.desc}</p>

            <div className={styles.tenderMeta}>
              <span className={styles.metaItem}><strong>Published:</strong> {item.date}</span>
              <span className={`${styles.metaItem} ${item.status === "open" ? styles.deadlineHighlight : ""}`}>
                <strong>Closing / Cycle:</strong> {item.closingDate}
              </span>
              <button 
                className={styles.btnReadMore}
                onClick={() => setSelectedTender(item)}
              >
                View Full Notice &amp; Scope
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal Window ── */}
      {selectedTender && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTender(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selectedTender.title}</h3>
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setSelectedTender(null)}
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className={styles.modalBody}>
              <div className={styles.modalDetailSection}>
                <h4>Overview &amp; Purpose</h4>
                <p>{selectedTender.desc}</p>
              </div>

              <div className={styles.modalDetailSection}>
                <h4>Key Assignment Scope</h4>
                <ul>
                  {selectedTender.scope.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalDetailSection}>
                <h4>Eligibility &amp; Criteria</h4>
                <p>{selectedTender.eligibility}</p>
              </div>

              <div className={styles.modalDetailSection}>
                <h4>Submission &amp; Timelines</h4>
                <p>
                  <strong>Date Published:</strong> {selectedTender.date} &nbsp;|&nbsp; 
                  <strong style={{ color: "#dc2626" }}> Closing Date:</strong> {selectedTender.closingDate}
                </p>
              </div>

              <div className={styles.telegramAlertBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#15803d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/></svg>
                <div>
                  <strong>Real-time Empanelment Alerts:</strong> Join the official CA community channel for daily updates on bank and PSU empanelments.<br />
                  <a href="https://t.me/casansaar" target="_blank" rel="noopener noreferrer">
                    Join Official CA Updates Channel (Telegram)
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <a 
                href={selectedTender.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnRfp}
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Reference Attachment
              </a>
              <button 
                onClick={() => setSelectedTender(null)}
                className="btn btn-outline"
                style={{ padding: "8px 18px", fontSize: "0.85rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </InnerPageLayout>
  );
}
