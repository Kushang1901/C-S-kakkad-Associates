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

      <div style={{ marginTop: "40px" }}>
        <Link href="/enquiry" className="btn btn-primary">Request GST Compliance Quote</Link>
        <Link href="/contact" className="btn btn-outline" style={{ marginLeft: "15px" }}>Get Office Address</Link>
      </div>
    </InnerPageLayout>
  );
}
