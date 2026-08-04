import InnerPageLayout from "@/components/InnerPageLayout";

export default function PrivacyPolicy() {
  return (
    <InnerPageLayout title="Privacy Policy" breadcrumbs={[{ name: "Privacy Policy" }]}>
      <h2>Privacy & Data Security Policy</h2>
      <p>
        At <strong>C S Kakkad & Associates</strong>, we recognize the high sensitivity of the financial, taxation, and personal records shared by our clients. Maintaining absolute client confidentiality is a core ethical commitment of our chartered accountancy practice. This policy describes how we collect, store, and shield your financial datasets.
      </p>

      <h2>1. Collection of Client Information</h2>
      <p>
        We collect information provided directly by clients during consultations, audits, tax preparation, or enquiry submissions. This includes:
      </p>
      <ul>
        <li>Identity records: PAN, Aadhaar card, directors' DIN numbers, passport details.</li>
        <li>Financial records: Bank statements, ledger accounts, sales/purchase registers, payroll tallies.</li>
        <li>Filing credentials: Login keys for the Income Tax E-filing portal, GSTIN portal, TRACES, and MCA systems.</li>
      </ul>

      <h2>2. Use of Information</h2>
      <p>
        All client documents are used strictly to execute requested services:
      </p>
      <ul>
        <li>Formulating statutory audit reports and preparing tax computations.</li>
        <li>E-filing periodic returns (ITR, GST, TDS, MCA forms).</li>
        <li>Liaising with banking institutions to syndicating loans and finance packages.</li>
      </ul>

      <h2>3. Information Protection & Storage</h2>
      <p>
        We implement comprehensive physical and digital security structures:
      </p>
      <ol>
        <li><strong>Secure Cloud Ledgers:</strong> All softcopies are stored on secure cloud platforms featuring two-factor authentication and bank-grade encryption.</li>
        <li><strong>Physical Security:</strong> All printed tax registers, deeds, and files are locked in secure storage cabinets at our Dwarka and Surajkaradi offices, accessible only to authorized assistants.</li>
        <li><strong>Assistance Protocols:</strong> Our articled assistants and paid accountants sign strict confidentiality agreements preventing the copy or transmission of client records outside our office networks.</li>
      </ol>

      <h2>4. Third-Party Sharing Limits</h2>
      <p>
        We <strong>never sell, lease, or distribute</strong> client data to third-party marketing companies. Client datasets are only disclosed to:
      </p>
      <ul>
        <li>Official tax authorities (Income Tax Department, GST Department, MCA) to process filings as authorized by you.</li>
        <li>Commercial banks or credit officers as explicitly requested by you for loan syndication files.</li>
        <li>Regulatory bodies like the ICAI if mandated by peer review committees under strict confidentiality protocols.</li>
      </ul>

      <h2>5. Contact & Updates</h2>
      <p>
        We update this policy periodically to align with WIRC/ICAI guidelines. For questions regarding your data security, please email CA Chintan S. Kakkad at <a href="mailto:cachintankakkad@gmail.com" style={{ color: "var(--secondary-color)", fontWeight: "600", textDecoration: "underline" }}>cachintankakkad@gmail.com</a>.
      </p>
    </InnerPageLayout>
  );
}
