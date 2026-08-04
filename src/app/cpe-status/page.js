import InnerPageLayout from "@/components/InnerPageLayout";

export default function CPEStatus() {
  return (
    <InnerPageLayout title="CPE Status Check" breadcrumbs={[{ name: "CPE Status" }]}>
      <h2>Continuing Professional Education (CPE) hours</h2>
      <p>
        In alignment with the directives of the Institute of Chartered Accountants of India (ICAI), members in practice and holding a Certificate of Practice (COP) are required to complete a specified number of CPE hours annually. This ensures that practicing professionals remain conversant with emerging taxation notifications, accounting standards, and international regulations.
      </p>

      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--primary-color)", marginBottom: "10px" }}>CPE Hours Requirements</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Under current guidelines, practicing Chartered Accountants below 60 years of age are required to complete at least 20 structured CPE learning hours annually (or 120 credit hours in a rolling block of 3 years) to maintain active audit and signatory statuses.
        </p>
      </div>

      <h2>Check Your Credit Status Online</h2>
      <p>
        Members can track their completed structured and unstructured CPE hours directly on the official ICAI CPE portal. Use the link below to sign in with your ICAI membership number and check your ledger:
      </p>

      <div style={{ margin: "30px 0" }}>
        <a 
          href="https://www.cpeforum.org/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          Access ICAI CPE Forum Portal
          <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>

      <h2>Steps to View Your CPE Ledger:</h2>
      <ol>
        <li>Click the button above to navigate to the official <strong>CPE Portal</strong>.</li>
        <li>Log in using your 6-digit Membership Number as username.</li>
        <li>Enter your password (default passwords are usually sent by ICAI during regional registration).</li>
        <li>Navigate to the "CPE Hours Ledger" tab to view credits sorted by calendar blocks.</li>
      </ol>

      <p style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        *Note: For any login recovery or correction in credit hours, please contact your respective regional council (WIRC/SIRC/EIRC/NIRC/CIRC) or email the CPE committee desk at cpeadmin@icai.in.
      </p>
    </InnerPageLayout>
  );
}
