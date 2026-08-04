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

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Request Audit Consultation</Link>
        <Link href="/empanelment" className="btn btn-outline">Empanelment Details</Link>
      </div>
    </InnerPageLayout>
  );
}
