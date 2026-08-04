import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function AccountingOutsourcing() {
  return (
    <InnerPageLayout 
      title="Accounting & Outsourcing Services" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Accounting & Outsourcing" }]}
    >
      <h2>Streamline Your Bookkeeping & Operations</h2>
      <p>
        In today's fast-paced business environment, maintaining a dedicated in-house accounting department can be expensive and logistically challenging. <strong>C S Kakkad & Associates</strong> offers professional accounting and outsourcing services, enabling you to focus on your core business growth while we manage your financial records with accuracy.
      </p>

      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        Our outsourcing services ensure that your financial accounts are always audit-ready, compliant with accounting standards, and provide real-time indicators to aid corporate decision-making.
      </div>

      <h2>Our Scope of Accounting Services</h2>
      <p>
        We provide a complete suite of services that cover every aspect of your business transactions:
      </p>
      <ul>
        <li>
          <strong>End-to-End Bookkeeping:</strong> Systematic recording of sales, purchases, receipts, and payments on professional secure software.
        </li>
        <li>
          <strong>Financial Statement Preparation:</strong> Monthly, quarterly, or annual preparation of Balance Sheets, Profit & Loss Statements, and Cash Flow statements.
        </li>
        <li>
          <strong>Payroll Management:</strong> Calculation of employee salaries, salary slip generation, and compliance with Provident Fund (PF), Employee State Insurance (ESI), and Professional Tax (PT).
        </li>
        <li>
          <strong>Accounts Receivable & Payable:</strong> Tracking client invoices, vendor bills, aging reports, and sending reminders to optimize working capital cycles.
        </li>
        <li>
          <strong>MIS Reporting:</strong> Designing customized Management Information System reports to track profitability, budget variations, and expenses.
        </li>
      </ul>

      <h2>Benefits of Outsourcing to Us</h2>
      <p>
        Outsourcing your accounting requirements to CA-led professionals guarantees:
      </p>
      <ol>
        <li><strong>Cost Efficiency:</strong> Avoid salaries, software licensing, training costs, and infrastructure setup for in-house accountants.</li>
        <li><strong>Compliance Assurance:</strong> Automatic adjustment for tax deductions at source (TDS), GST compliance, and standard reporting guidelines during journal entries.</li>
        <li><strong>Enhanced Data Security:</strong> Safe cloud backups, encrypted transmission, and strict access controls to prevent database leaks.</li>
        <li><strong>Seamless Audits:</strong> Since accounts are compiled under professional CA oversight, your year-end statutory and tax audits proceed smoothly and quickly.</li>
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
          Documents Required for Setup
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          To initiate our accounting outsourcing service, please prepare the following documents:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            "PAN Card & GST Registration Certificate",
            "Bank Statements for the current financial period",
            "Sales and Purchase invoices / records",
            "Cash Transaction registers & Petty Cash details",
            "Previous Year's Audited Financial Statements",
            "Salary / Payroll structures and employee lists"
          ].map((doc, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span>
              {doc}
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Enquire About Accounting Services</Link>
        <Link href="/contact" className="btn btn-outline">Contact Office</Link>
      </div>
    </InnerPageLayout>
  );
}
