import InnerPageLayout from "@/components/InnerPageLayout";
import EnquiryForm from "@/components/EnquiryForm";

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
