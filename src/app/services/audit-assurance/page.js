import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function AuditAssurance() {
  return (
    <InnerPageLayout 
      title="Audit & Assurance Services" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Audit & Assurance" }]}
    >
      <h2>Credibility & Compliance Through Independent Auditing</h2>
      <p>
        Auditing is not just a statutory obligation; it is a critical process to establish the financial health, governance standards, and operational credibility of your business before lenders, shareholders, and tax regulators. <strong>C S Kakkad & Associates</strong> delivers independent and robust audit services that ensure your financial statements represent a true and fair view.
      </p>

      <div style={{
        backgroundColor: "var(--accent-green)",
        borderLeft: "4px solid var(--secondary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--secondary-color)", marginBottom: "10px" }}>Strict ICAI & Statutory Compliance</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          All our audits are conducted in strict accordance with the Auditing Standards issued by the Institute of Chartered Accountants of India (ICAI) and relevant provisions of the Companies Act, 2013 and the Income Tax Act, 1961.
        </p>
      </div>

      <h2>Our Auditing Capabilities</h2>
      <p>
        We provide several specialized audit structures based on regulatory requirements and business objectives:
      </p>
      <ul>
        <li>
          <strong>Statutory Audits:</strong> Conducting mandatory year-end audits for private limited companies, LLPs, and public trusts as required under Indian corporate law.
        </li>
        <li>
          <strong>Tax Audits:</strong> Formulating audit reports under Section 44AB of the Income Tax Act, 1961, verifying business turnover limits, and preparing Form 3CD.
        </li>
        <li>
          <strong>Internal Audits:</strong> Reviewing company processes, accounting records, and operational methods to identify leakages, improve internal check structures, and mitigate corporate risks.
        </li>
        <li>
          <strong>Stock & Bank Audits:</strong> Executing stock verification and credit monitoring audits empanelled by commercial banks to evaluate working capital security.
        </li>
        <li>
          <strong>GST Audits & Reconciliations:</strong> Assisting businesses with reconciliation reports under Form GSTR-9C to align accounts with periodic GST filings.
        </li>
      </ul>

      <h2>Our Auditing Methodology</h2>
      <p>
        Our audit process is structured to be thorough, transparent, and non-disruptive:
      </p>
      <ol>
        <li><strong>Planning & Risk Analysis:</strong> Understanding your business cycle, transactions, and risk areas to draft a focused audit program.</li>
        <li><strong>Field Verification & Substantive Testing:</strong> Reviewing journal vouchers, ledger tallies, bank statements, asset verifications, and compliance filings.</li>
        <li><strong>Discussion & Draft Report:</strong> Aligning with the management on internal control gaps, adjustments, and draft audit findings.</li>
        <li><strong>Final Sign-off:</strong> Issuing the audit report with UDIN (Unique Document Identification Number) to comply with ICAI regulations.</li>
      </ol>

      <div style={{
        background: "var(--bg-light)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--border-radius-lg)",
        padding: "24px",
        margin: "30px 0"
      }}>
        <h3 style={{ 
          color: "var(--primary-color)", 
          fontSize: "1.2rem", 
          marginTop: 0, 
          marginBottom: "16px", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px" 
        }}>
          <svg style={{ width: "20px", height: "20px", color: "var(--secondary-color)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Documents Required for Audit
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          To conduct a smooth and compliant audit, please prepare the following accounting documents:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            "Complete Trial Balance & Books of Accounts",
            "Bank Statements & Bank Reconciliation Statements (BRS)",
            "Sales, Purchase, and Expense ledgers",
            "GST Return filings (GSTR-1, 3B, GSTR-9/9C)",
            "TDS returns, Challans, and Form 26AS/AIS",
            "Fixed Asset Register & Depreciation schedules"
          ].map((doc, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span>
              {doc}
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Request Audit Consultation</Link>
        <Link href="/empanelment" className="btn btn-outline">Empanelment Details</Link>
      </div>
    </InnerPageLayout>
  );
}
