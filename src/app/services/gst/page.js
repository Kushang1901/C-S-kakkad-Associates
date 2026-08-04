import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function GSTServices() {
  return (
    <InnerPageLayout 
      title="Goods & Services Tax (GST)" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Goods & Service Tax" }]}
    >
      <h2>Complete Indirect Tax Management & Compliance</h2>
      <p>
        Goods & Services Tax (GST) has undergone rapid structural updates, circulars, and system modifications since its inception. For corporate taxpayers and businesses, managing Input Tax Credit (ITC), filing monthly returns, and ensuring match-ups with vendor GSTR-2B are crucial tasks. <strong>C S Kakkad & Associates</strong> provides professional end-to-end GST services.
      </p>

      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        Our systematic invoice reconciliation process matches your purchase books with GSTR-2B in real-time, preventing input tax credit blockages and minimizing tax mismatch notices.
      </div>

      <h2>Our GST Services Suite</h2>
      <p>
        We handle every aspect of GST administration and compliance for your business:
      </p>
      <ul>
        <li>
          <strong>GST Registration & Amendment:</strong> Processing fresh GSTIN applications, adding branch addresses, changing business names, and managing legal adjustments.
        </li>
        <li>
          <strong>Periodic Return Filing:</strong> Preparation and online filing of monthly/quarterly returns, including GSTR-1 (Outward Supplies), GSTR-3B (Summary Return), and CMP-08 (Composition Scheme).
        </li>
        <li>
          <strong>Input Tax Credit (ITC) Auditing:</strong> Regular checks to ensure credit is only claimed on eligible business purchases and vendor compliance checks.
        </li>
        <li>
          <strong>GST Annual Returns:</strong> Preparing Form GSTR-9 and GSTR-9C (Reconciliation Statement) to close the financial year.
        </li>
        <li>
          <strong>Notice Replying & Representation:</strong> Drafting legal replies to GST notifications regarding mismatches, scrutiny, or audit orders, and representing clients before GST commissioners.
        </li>
        <li>
          <strong>Refund Processing:</strong> Handling GST refund applications for exporters, inverted duty structures, and excess cash ledger deposits.
        </li>
      </ul>

      <h2>Importance of Proper GST Filing</h2>
      <p>
        Failing to manage your GST records can lead to heavy interest penalties, credit blockages, or even cancellation of registration. Under our supervision, your tax records remain clean, reconciled, and completely aligned with the rules of the Central Board of Indirect Taxes and Customs (CBIC).
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
          Documents Required for GST Setup
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          To apply for a fresh GST registration or start monthly GST filings, please prepare the following:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            "PAN Card of the applicant or corporate entity",
            "Aadhaar Card of the primary promoter/directors",
            "Proof of Business Place (Rent Agreement or Property Deed)",
            "Electricity Bill or Property Tax Receipt (Recent)",
            "Authorization Letter or Board Resolution copy",
            "Bank Account Proof (Cancelled cheque or Bank Statement)"
          ].map((doc, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-dark)" }}>
              <span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span>
              {doc}
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Request GST Compliance Quote</Link>
        <Link href="/contact" className="btn btn-outline">Get Office Address</Link>
      </div>
    </InnerPageLayout>
  );
}
