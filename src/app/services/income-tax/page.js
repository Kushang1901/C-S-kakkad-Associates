import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function IncomeTaxServices() {
  return (
    <InnerPageLayout 
      title="Income Tax Services" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Income Tax" }]}
    >
      <h2>Strategic Direct Taxation & Compliance</h2>
      <p>
        Direct tax compliance is more than just filing yearly tax returns. It requires proactive salary structuring, capital gains calculations, depreciation scheduling, and corporate advance tax evaluations. <strong>C S Kakkad & Associates</strong> provides expert direct tax services to optimize your tax liabilities legally while ensuring complete adherence to the Income Tax Act, 1961.
      </p>

      <div style={{
        backgroundColor: "var(--accent-green)",
        borderLeft: "4px solid var(--secondary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--secondary-color)", marginBottom: "10px" }}>Scrutiny & Notice Management</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Our team handles e-assessments, drafts detailed submissions for income tax scrutiny notifications, and presents files before CIT (Appeals) with deep legal reasoning.
        </p>
      </div>

      <h2>Our Direct Tax Capabilities</h2>
      <p>
        We provide direct tax management for individuals, partnerships, startups, and corporates:
      </p>
      <ul>
        <li>
          <strong>Income Tax Return (ITR) Filing:</strong> Preparing and e-filing returns from ITR-1 to ITR-7 for salaried individuals, business partners, HUFs, and corporate companies.
        </li>
        <li>
          <strong>Corporate Tax Advisory:</strong> Advising companies on MAT, tax incentives, corporate structures, dividend distribution rules, and depreciation optimization.
        </li>
        <li>
          <strong>TDS & TCS Management:</strong> Monthly TDS calculation, quarterly TDS return preparation and filing (Form 24Q, 26Q, 27Q), and generating Form 16 / 16A.
        </li>
        <li>
          <strong>Capital Gains Planning:</strong> Structuring property, stock, and business asset transactions to maximize exemptions under Section 54, 54EC, and 54F.
        </li>
        <li>
          <strong>Advance Tax Computations:</strong> Calculating and monitoring quarterly advance tax installments to prevent interest penalties under Section 234B and 234C.
        </li>
        <li>
          <strong>PAN & TAN Services:</strong> fresh applications and corrections for Permanent Account Number and Tax Deduction Account Number.
        </li>
      </ul>

      <h2>Why Trust Us With Your Taxes</h2>
      <p>
        Under our professional guidance, your tax filings are managed by qualified Fellows who crosscheck calculations, verify income against Form 26AS and AIS (Annual Information Statement), and implement tax optimization strategies within corporate limits.
      </p>

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
          Documents Required for Income Tax Filing
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          To file your Income Tax Return accurately, please compile and share the following records:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            "PAN & Aadhaar Card copies",
            "Form 16 (for salaries) / Form 16A (TDS certificates)",
            "Bank Statements for the entire financial year",
            "Investment Proofs (80C LIC/PPF, 80D Mediclaim, Housing Loan)",
            "Form 26AS & AIS (Annual Information Statement) downloads",
            "Capital Gains statements (Mutual funds, stocks, property deeds)"
          ].map((doc, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span>
              {doc}
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">File Your ITR Now</Link>
        <Link href="/contact" className="btn btn-outline">Get In Touch</Link>
      </div>
    </InnerPageLayout>
  );
}
