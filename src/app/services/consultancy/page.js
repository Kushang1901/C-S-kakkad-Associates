import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Consultancy() {
  return (
    <InnerPageLayout 
      title="Consultancy Services" 
      breadcrumbs={[{ name: "Services", path: "/#services" }, { name: "Consultancy Services" }]}
    >
      <h2>Strategic Business Consultancy & Setup</h2>
      <p>
        Launching a startup, expanding a partnership, or restructuring a family business requires clear legal registration and financial planning. Choosing the wrong entity or failing to register for the right regulatory certificates early can lead to legal bottlenecks and high tax outlays. <strong>C S Kakkad & Associates</strong> provides professional consulting to structure your business for success.
      </p>

      <div style={{
        backgroundColor: "var(--accent-green)",
        borderLeft: "4px solid var(--secondary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--secondary-color)", marginBottom: "10px" }}>End-to-End Handholding</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          We assist entrepreneurs from name approval and incorporation to registering PAN, TAN, GSTIN, and setting up initial internal bookkeeping, ensuring a compliant launch.
        </p>
      </div>

      <h2>Our Advisory Services Scope</h2>
      <p>
        We provide strategic consultation in corporate, tax, and commercial areas:
      </p>
      <ul>
        <li>
          <strong>Startup & Company Incorporation:</strong> Registration of Private Limited Companies, Public Limited Companies, One Person Companies (OPCs), and LLPs with the Ministry of Corporate Affairs (MCA).
        </li>
        <li>
          <strong>Partnership & Proprietorship Registration:</strong> Drafting partnership deeds, registering deeds under the Partnership Act, and setting up proprietorship business certifications.
        </li>
        <li>
          <strong>Corporate Law Compliance:</strong> Managing statutory MCA filings, filing annual accounts (AOC-4) and annual returns (MGT-7), keeping minutes, and managing board resolutions.
        </li>
        <li>
          <strong>MSME / Udyam Registration:</strong> Helping businesses register under Udyam to access government credit programs and interest protections.
        </li>
        <li>
          <strong>Corporate Financial Planning:</strong> Reviewing capital structures, advising on corporate taxation schemes, and structuring mergers or partnership adjustments.
        </li>
      </ul>

      <h2>Why Choose Our Consultation</h2>
      <p>
        Navigating corporate registrations under professional CA guidelines ensures:
      </p>
      <ol>
        <li><strong>Right Entity Selection:</strong> We advise whether a Company, LLP, or Partnership fits your liability, scale, and tax bracket requirements.</li>
        <li><strong>Flawless Documentation:</strong> Drafting clean Articles of Association (AOA) and Memorandum of Association (MOA) prevents internal disputes later.</li>
        <li><strong>Total Legal Protection:</strong> Early registration of intellectual property, MSME shields, and tax registrations shields your personal assets.</li>
      </ol>

      <div className="btn-group">
        <Link href="/enquiry" className="btn btn-primary">Book Setup Consultation</Link>
        <Link href="/contact" className="btn btn-outline">Office Details</Link>
      </div>
    </InnerPageLayout>
  );
}
