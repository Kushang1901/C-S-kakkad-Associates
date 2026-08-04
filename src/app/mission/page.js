import InnerPageLayout from "@/components/InnerPageLayout";

export default function Mission() {
  return (
    <InnerPageLayout title="Our Mission" breadcrumbs={[{ name: "Mission" }]}>
      <h2>Our Operational Mission</h2>
      <p>
        The mission of <strong>C S Kakkad & Associates</strong> is to provide premium, professional chartered accountancy services that deliver peace of mind and strategic clarity. We are committed to processing tax filings, audit verifications, and financial syndication with maximum precision and zero delay.
      </p>
      
      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        "To deliver timely, compliant, and cost-effective accounting, auditing, and tax advisory services that protect our clients' assets and empower their strategic decisions."
      </div>

      <h2>How We Deliver Our Mission</h2>
      <p>
        We operationalize our mission through specific client service commitments:
      </p>
      <ul>
        <li>
          <strong>Precision in Practice:</strong> We implement multi-layered verification in auditing and filing returns to eliminate calculation errors and ensure alignment with the latest CBIC and CBDT notifications.
        </li>
        <li>
          <strong>Client First Approach:</strong> Every business is unique. We customize our advisory, matching our solutions to the size, sector, and risk profile of the client.
        </li>
        <li>
          <strong>Timely Delivery:</strong> We know the costs of missing compliance deadlines. We send proactive reminders and manage our calendar so that returns, tax audits, and forms are filed well before the due date.
        </li>
        <li>
          <strong>Knowledge Sharing:</strong> We don't just process tax. We educate our clients on what the tax laws mean for their operations, helping them structure business entities, loans, and GST transactions wisely.
        </li>
      </ul>

      <h2>Core Professional Commitment</h2>
      <p>
        We pledge to uphold the regulations of the Institute of Chartered Accountants of India (ICAI) and strictly comply with the Code of Ethics. Our clients can trust that their financial structures are built on a solid legal foundation.
      </p>
    </InnerPageLayout>
  );
}
