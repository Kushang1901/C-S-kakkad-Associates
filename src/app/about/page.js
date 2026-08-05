import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function About() {
  return (
    <InnerPageLayout title="About Us" breadcrumbs={[{ name: "About Us" }]}>
      <h2>Firm Profile</h2>
      <p>
        Established with a commitment to integrity, efficiency, and high professional standards, <strong>C S Kakkad & Associates</strong> is a premier Chartered Accountancy firm rendering comprehensive services in India. We cater to the growing audit, tax, accounting, and business advisory needs of corporations, institutions, partnership firms, and individuals.
      </p>
      <p>
        Located in a bustling urban center, our firm is a distinguished financial consulting practice that specializes in providing comprehensive financial planning services for individuals and businesses. With a team of experienced professionals, we offer tailored solutions for wealth management, retirement planning, insurance services, and tax consulting. Our approach is centered on building long-lasting client relationships, ensuring each client's financial goals are met with personalized strategies and expert guidance.
      </p>
      
      <div style={{
        backgroundColor: "var(--accent-blue)",
        borderLeft: "4px solid var(--primary-color)",
        padding: "20px",
        borderRadius: "0 var(--border-radius) var(--border-radius) 0",
        marginBottom: "24px",
        fontStyle: "italic"
      }}>
        Our focus is to provide consistent, customized, and workable tax and financial solutions to our clients with the highest level of dedication, integrating advanced digital technologies and thorough regulatory research.
      </div>

      <p>
        The firm is led by experienced professionals who understand that today's rapidly changing economic landscape demands agility, compliance, and forward-thinking strategies. Under our leadership, the firm has achieved robust growth, advising clients in retail, manufacturing, logistics, tourism, and services sector.
      </p>

      <h2>Our Philosophy</h2>
      <p>
        By focusing on deep business understanding rather than just transaction-level processing, we provide advice that aids growth while maintaining 100% compliance with corporate and direct/indirect tax laws.
      </p>
      <p>
        Our standards are centered around three core values:
      </p>
      <ul>
        <li><strong>Integrity:</strong> Uncompromised honesty and ethical behavior in every transaction, report, and audit conducted.</li>
        <li><strong>Competence:</strong> Keeping ourselves updated with changing acts, rules, and circulars to advise clients with precision.</li>
        <li><strong>Confidentiality:</strong> Respecting the sensitivity of financial data and ensuring secure cloud storage and strict privacy protocols.</li>
      </ul>

      <h2>Why Work With Us</h2>
      <p>
        We offer single-window services for all compliance, auditing, taxation, and business setup needs. With dual offices in Dwarka and Surajkaradi, we provide localized support to businesses and individuals, ensuring easy access to tax professionals whenever needed.
      </p>
      <div className="btn-group">
        <Link href="/contact" className="btn btn-primary">Visit Our Office</Link>
        <Link href="/enquiry" className="btn btn-outline">Book Consultation</Link>
      </div>
    </InnerPageLayout>
  );
}
