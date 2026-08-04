import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Disclaimer() {
  return (
    <InnerPageLayout title="Disclaimer" breadcrumbs={[{ name: "Disclaimer" }]}>
      <h2>ICAI Compliance Disclaimer</h2>
      <p>
        This website is maintained strictly to provide general information about the services offered by <strong>C S Kakkad & Associates</strong> and acts as a resource portal containing reference links to legislative Acts, rules, and downloadable tax forms.
      </p>

      <div style={{
        backgroundColor: "var(--bg-white)",
        borderLeft: "4px solid #D32F2F",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px"
      }}>
        <h3 style={{ marginTop: 0, color: "#D32F2F", marginBottom: "10px" }}>No Solicitation or Advertisement</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Under the regulations of the <strong>Institute of Chartered Accountants of India (ICAI)</strong>, Chartered Accountants are prohibited from advertising or soliciting clients, directly or indirectly. By accessing this website, you acknowledge that you are doing so of your own free will to obtain general information, and that no advertisement, invitation, or solicitation of any kind has been made by the firm or its partners.
        </p>
      </div>

      <h2>1. Informational Purposes Only</h2>
      <p>
        The content, calculators, news tickers, and legislative tables provided on this website are for general informational purposes only. They do not constitute formal professional advice, legal opinions, or audited reports. Financial laws are subject to rapid revisions; therefore, users should consult CA Chintan S. Kakkad directly before making investment or taxation decisions.
      </p>

      <h2>2. No Client-Professional Relationship</h2>
      <p>
        Transmission, receipt, or submission of data through our Enquiry or Empanelment forms does not create a formal Client-Chartered Accountant relationship. A formal relationship is only established after mutual discussion, signing of an engagement letter, and verification of conflict of interest guidelines as defined by the ICAI.
      </p>

      <h2>3. External Link disclaimer</h2>
      <p>
        We provide reference links to official government websites (like Income Tax E-filing, GST portal, MCA). C S Kakkad & Associates does not warrant or guarantee the accuracy, completeness, or safety of external links.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        The firm shall not be held liable for any loss, penalty, or tax interest arising from decisions made by visitors based on general information, news ticker dates, or downloaded forms obtained from this website. Complete advisory should be taken directly via formal consultation.
      </p>
    </InnerPageLayout>
  );
}
