import InnerPageLayout from "@/components/InnerPageLayout";

export default function Vision() {
  return (
    <InnerPageLayout title="Our Vision" breadcrumbs={[{ name: "Vision" }]}>
      <h2>Strategic Vision</h2>
      <p>
        At <strong>C S Kakkad & Associates</strong>, our vision is to be recognized as one of the most reliable and forward-thinking Chartered Accountancy firm in the region. We aim to act as a pillar of financial security and regulatory clarity for businesses of all scales.
      </p>
      
      <div style={{
        backgroundColor: "var(--accent-green)",
        borderLeft: "4px solid var(--secondary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--secondary-color)", marginBottom: "10px" }}>To Enable Compliant Growth</h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          We envision a business ecosystem where entrepreneurship and compliance go hand in hand. By simplifying tax and financial laws, we help our clients grow securely without legal roadblocks.
        </p>
      </div>

      <h2>Key Pillars of Our Vision</h2>
      <p>
        To achieve our vision, we focus on four primary strategic goals:
      </p>
      <ol>
        <li>
          <strong>Pioneering Digital Tax Solutions:</strong> We aspire to integrate AI and secure cloud bookkeeping solutions, enabling clients to access real-time profit and loss metrics and instant tax compliance reports.
        </li>
        <li>
          <strong>Empowering Local Business & Startups:</strong> We strive to support the local economy in Dwarka and Surajkaradi by advising small and medium enterprises (MSMEs) on project financing, bank credit, and government subsidies.
        </li>
        <li>
          <strong>Setting Ethical Standards:</strong> We aim to lead by example, promoting transparent tax practices and robust internal audits that help businesses build trust with lenders, investors, and regulators.
        </li>
        <li>
          <strong>Talent Grooming:</strong> Creating a collaborative space for articles and young professionals to learn, practice, and build high-quality professional ethics.
        </li>
      </ol>

      <p style={{ marginTop: "30px" }}>
        Through these pillars, we strive to build a sustainable firm that remains a trusted adviser for generations.
      </p>
    </InnerPageLayout>
  );
}
