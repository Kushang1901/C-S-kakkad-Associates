"use client";

import { useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Empanelment() {
  const [selectedEmpanelment, setSelectedEmpanelment] = useState(null);

  const empanelments = [
    {
      id: 9036,
      title: "Co-operative Bank Invites Applications from Firms for IS Audit Services",
      date: "03 Aug 2026",
      closingDate: "13 Aug 2026",
      desc: "Empanelment of Chartered Accountant / Certified Information System Auditor (CISA) / DISA firms for conducting Information System (IS) audit of the bank branches and core systems.",
      pdfLink: "/empanelment-is-audit.pdf"
    },
    {
      id: 9035,
      title: "Appointment of CA / CMA firm for Internal Audit of POWERGRID",
      date: "03 Aug 2026",
      closingDate: "10 Aug 2026",
      desc: "Empanelment of Firms / LLPs of Indian Chartered Accountants (CA) / Cost Accountants (CMA) for Internal Audit / Physical Verification of fixed assets for the Financial Years 2026-27, 2027-28 and 2028-29.",
      pdfLink: "/empanelment-internal-audit.pdf"
    },
    {
      id: 9034,
      title: "Financial Audit Services – Applications Invited from CA Firms",
      date: "03 Aug 2026",
      closingDate: "24 Aug 2026",
      desc: "Applications are invited from partnership CA firms for appointment as Statutory Financial Auditors of various administrative and municipal offices.",
      pdfLink: "/empanelment-financial-audit.pdf"
    },
    {
      id: 9033,
      title: "Empanelment of Information System Auditors of UCO Bank",
      date: "03 Aug 2026",
      closingDate: "19 Aug 2026",
      desc: "Request for Proposal (RFP) for Empanelment of Information System Auditors (E-tendering) for UCO Bank branches and systems. Pre-bid clarifications and original RFP guidelines.",
      pdfLink: "/empanelment-uco-bank.pdf"
    },
    {
      id: 9032,
      title: "Secretarial Compliance Services – Applications Invited from Practicing Professional Firms",
      date: "03 Aug 2026",
      closingDate: "11 Aug 2026",
      desc: "Expressions of Interest (EOI) invited from practicing Company Secretaries (PCS) and LLPs for secretarial audits and quarterly MCA compliance filings.",
      pdfLink: "/empanelment-secretarial-compliance.pdf"
    },
    {
      id: 9031,
      title: "Empanelment of CA Firms for Financial Services",
      date: "03 Aug 2026",
      closingDate: "11 Aug 2026",
      desc: "A public corporation invites proposals from CAG empanelled Chartered Accountant firms for accounting advisory, credit syndication reviews, and GST reconciliations.",
      pdfLink: "/empanelment-financial-services.pdf"
    },
    {
      id: 9030,
      title: "CA Firms Required for Statutory Audit Assignment",
      date: "03 Aug 2026",
      closingDate: "10 Aug 2026",
      desc: "Statutory audit assignment for the financial year. Requires minimum 5 years of firm standing and CAG empanelment category 2/3 status.",
      pdfLink: "/empanelment-statutory-audit.pdf"
    },
    {
      id: 9028,
      title: "Bank Invites Auditors Applications for Internal Audit Services",
      date: "01 Aug 2026",
      closingDate: "12 Aug 2026",
      desc: "Empanelment of concurrent and internal auditors for regional branches. Interested firms must submit online applications on the bank's portal.",
      pdfLink: "/empanelment-bank-internal.pdf"
    },
    {
      id: 9027,
      title: "Due Diligence Services – Notice Invited by the Bank",
      date: "01 Aug 2026",
      closingDate: "07 Aug 2026",
      desc: "Notice inviting experienced CA firms for conducting due diligence, credit inspection reports, and asset audits for corporate credit borrowers.",
      pdfLink: "/empanelment-due-diligence.pdf"
    }
  ];

  return (
    <InnerPageLayout title="Empanelment & Tenders" breadcrumbs={[{ name: "Empanelment" }]}>
      <h2>Active Empanelment Opportunities & Tenders</h2>
      <p style={{ marginBottom: "30px" }}>
        Find the latest bank empanelments, PSU audit tenders, and corporate expressions of interest (EOIs). Click on any listing title or its "Read More" link to view application details and download the official attachments.
      </p>

      {/* Empanelment List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {empanelments.map((item) => (
          <div 
            key={item.id} 
            style={{
              padding: "24px 0",
              borderBottom: "1px dashed var(--border-color)"
            }}
          >
            <h3 
              onClick={() => setSelectedEmpanelment(item)}
              style={{
                color: "var(--primary-color)",
                fontSize: "1.15rem",
                fontWeight: "600",
                cursor: "pointer",
                margin: "0 0 10px 0",
                lineHeight: "1.3"
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--secondary-color)"}
              onMouseLeave={(e) => e.target.style.color = "var(--primary-color)"}
            >
              {item.title}
            </h3>
            <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "var(--text-dark)", lineHeight: "1.6" }}>
              {item.desc}
            </p>
            <div style={{ 
              display: "flex", 
              gap: "24px", 
              fontSize: "0.85rem", 
              color: "var(--text-muted)", 
              marginBottom: "12px",
              flexWrap: "wrap"
            }}>
              <span><strong>Posted:</strong> {item.date}</span>
              <span style={{ color: "var(--secondary-color)", fontWeight: "600" }}>
                <strong>Closing Date:</strong> {item.closingDate}
              </span>
            </div>
            <span 
              onClick={() => setSelectedEmpanelment(item)}
              style={{
                color: "var(--secondary-color)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                textDecoration: "underline"
              }}
            >
              Read More
            </span>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedEmpanelment && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "650px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h3 style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "var(--primary-color)",
                lineHeight: "1.4",
                paddingRight: "20px"
              }}>
                {selectedEmpanelment.title}
              </h3>
              <button 
                onClick={() => setSelectedEmpanelment(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px"
                }}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div style={{
              padding: "24px",
              overflowY: "auto",
              maxHeight: "60vh",
              lineHeight: "1.6",
              color: "var(--text-dark)"
            }}>
              <p style={{ margin: "0 0 20px 0", fontSize: "0.95rem" }}>
                {selectedEmpanelment.desc}
              </p>

              <h4 style={{
                color: "var(--secondary-color)",
                fontSize: "0.95rem",
                fontWeight: "700",
                margin: "0 0 15px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                CLICK ON THE LINK FOR APPLY
              </h4>

              <p style={{ margin: "0 0 20px 0", fontSize: "0.95rem" }}>
                Join <strong>Official CA Sansaar Telegram Channel</strong> for all updates related to Empanelments.<br />
                <a 
                  href="https://t.me/casansaar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--secondary-color)",
                    textDecoration: "underline",
                    fontWeight: "600"
                  }}
                >
                  https://t.me/casansaar
                </a>
              </p>

              <div style={{ marginTop: "24px" }}>
                <a 
                  href={selectedEmpanelment.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--secondary-color)",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  View Attachment
                  <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <button 
                onClick={() => setSelectedEmpanelment(null)}
                className="btn btn-outline"
                style={{ padding: "8px 20px", fontSize: "0.9rem" }}
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
