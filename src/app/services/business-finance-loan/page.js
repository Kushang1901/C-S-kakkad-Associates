import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function BusinessFinanceLoan() {
  return (
    <InnerPageLayout 
      title="Business Finance & Loan Syndication" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Business Finance & Loan" }]}
    >
      <h2>Funding Advisory & Financial Structuring</h2>
      <p>
        Capital is the fuel that drives corporate growth, expansions, and operational stability. However, presenting credit requirements to banks and financial institutions requires precise documentation, financial projections, and compliance checks. <strong>C S Kakkad & Associates</strong> acts as your financial consultant, structuring loans and syndicating debt to power your business ventures.
      </p>

      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        Our financial modeling tools prepare credit-worthy project dossiers and CMA data that align with banking guidelines, leading to quicker evaluations and credit sanctions.
      </div>

      <h2>Our Debt Syndication & Advisory Services</h2>
      <p>
        We provide professional representation and preparation services for securing different banking lines:
      </p>
      <ul>
        <li>
          <strong>Project Financing:</strong> Structuring finance for new factory setups, hotel construction, commercial properties, and infrastructure expansions.
        </li>
        <li>
          <strong>Term Loans:</strong> Advising and syndicating long-term credit lines for purchasing machinery, vehicles, technology platforms, or business assets.
        </li>
        <li>
          <strong>Working Capital Facilities:</strong> Formulating credit limits for Cash Credit (CC), Overdraft (OD) accounts, Bank Guarantees (BG), and Letters of Credit (LC).
        </li>
        <li>
          <strong>MSME & Startup Loans:</strong> Helping micro, small, and medium businesses access CGTMSE collateral-free loans, Mudra schemes, and startup subsidy credits.
        </li>
        <li>
          <strong>CMA Data & Project Report Preparation:</strong> Preparing standard Credit Monitoring Arrangement (CMA) reports, fund flow statements, and break-even charts required by bank underwriters.
        </li>
      </ul>

      <h2>Our Loan Advisory Process</h2>
      <p>
        We handle your funding files through structured planning:
      </p>
      <ol>
        <li><strong>Needs Assessment:</strong> Reviewing your business projections, required capital outlay, and cash flow cycles to determine the right debt-equity ratio.</li>
        <li><strong>Financial Modeling:</strong> Building multi-year cash flow projections, debt service coverage ratio (DSCR) charts, and sensitivity analysis.</li>
        <li><strong>Dossier Compilation:</strong> Compiling CMA reports, past audited statements, KYC, ownership structures, and project summaries into a professional credit proposal.</li>
        <li><strong>Liaison & Sanctioning:</strong> Presenting the proposal to public sector, private sector, and cooperative banks and resolving audit queries for smooth disbursal.</li>
      </ol>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Enquire About Business Loan Advisory</Link>
        <Link href="/contact" className="btn btn-outline">Office Details</Link>
      </div>
    </InnerPageLayout>
  );
}
