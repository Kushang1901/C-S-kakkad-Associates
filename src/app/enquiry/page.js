import InnerPageLayout from "@/components/InnerPageLayout";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata = {
  title: "Book Consultation & Tax Enquiry | C S Kakkad & Associates",
  description: "Schedule an advisory consultation with CA Chintan S. Kakkad. Get expert assistance with income tax filing, audits, GST queries, and business loan applications.",
  alternates: {
    canonical: "https://www.cachintankakkad.in/enquiry",
  },
};

export default function Enquiry() {
  return (
    <InnerPageLayout title="Submit Enquiry" breadcrumbs={[{ name: "Enquiry" }]}>
      <h2>Business & Tax Enquiry</h2>
      <p>
        Please fill out the form below to request information or book a tax consultation. CA Chintan S. Kakkad or an associate will get back to you shortly. Submitting this form will automatically redirect you to send details via WhatsApp.
      </p>

      <EnquiryForm />
    </InnerPageLayout>
  );
}
