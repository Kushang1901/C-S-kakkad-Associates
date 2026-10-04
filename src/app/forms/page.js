import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Forms() {
  const forms = [
    {
      code: "Form 15G",
      name: "Declaration for Claiming Receipt of Income Without Deduction of Tax (For Individuals)",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-forms"
    },
    {
      code: "Form 15H",
      name: "Declaration for Claiming Receipt of Income Without Deduction of Tax (For Senior Citizens)",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-forms"
    },
    {
      code: "Form 16",
      name: "Certificate for Tax Deducted at Source (TDS) on Salary Income",
      category: "Income Tax / TRACES",
      action: "https://traces.tdscpc.gov.in/"
    },
    {
      code: "Form 16A",
      name: "Certificate for Tax Deducted at Source (TDS) on Income Other Than Salary",
      category: "Income Tax / TRACES",
      action: "https://traces.tdscpc.gov.in/"
    },
    {
      code: "Form 49A",
      name: "Application for Allotment of Permanent Account Number (PAN) - Indian Citizens",
      category: "Income Tax / PAN",
      action: "https://tinpan.proteantech.in/"
    },
    {
      code: "Form 49AA",
      name: "Application for Allotment of Permanent Account Number (PAN) - Foreign Citizens/Entities",
      category: "Income Tax / PAN",
      action: "https://tinpan.proteantech.in/"
    },
    {
      code: "Form 49B",
      name: "Application for Allotment of Tax Deduction and Collection Account Number (TAN)",
      category: "Income Tax / TAN",
      action: "https://tinpan.proteantech.in/"
    },
    {
      code: "Form 10E",
      name: "Form for Claiming Tax Relief under Section 89(1) on Salary Arrears",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-forms"
    },
    {
      code: "Form 10F",
      name: "Information for Claiming Relief under Tax Treaty (DTAA) for Non-Residents",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-forms"
    },
    {
      code: "ITR Utility",
      name: "Income Tax Offline Utilities (JSON/Excel) for ITR-1 to ITR-7",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-returns"
    },
    {
      code: "GST Offline",
      name: "GST Return Offline Tools (GSTR-1, GSTR-4, etc.)",
      category: "GST",
      action: "https://www.gst.gov.in/download/returns"
    },
    {
      code: "GST Registration",
      name: "GST New Registration & Application Portal",
      category: "GST",
      action: "https://reg.gst.gov.in/registration/"
    },
    {
      code: "MCA Forms",
      name: "Company Incorporation (SPICe+) & MCA V3 Statutory Filings",
      category: "Ministry of Corporate Affairs",
      action: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/forms.html"
    },
    {
      code: "Form 30",
      name: "Application for Tax Refund under Section 237 of the Income Tax Act",
      category: "Income Tax",
      action: "https://www.incometax.gov.in/iec/foportal/downloads/income-tax-forms"
    }
  ];

  return (
    <InnerPageLayout title="Utility Forms" breadcrumbs={[{ name: "Forms" }]}>
      <h2>Official Utility & Application Downloads</h2>
      <p>
        Direct access to official statutory portals for authenticated downloads, offline software utilities, PAN/TAN registration, and GST/Income Tax compliance filings:
      </p>

      <div className="table-responsive" style={{ marginTop: "30px" }}>
        <table className="table-custom">
          <thead>
            <tr>
              <th>Form Code</th>
              <th>Form / Utility Details</th>
              <th>Compliance Area</th>
              <th>Official Portal Link</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: "700", color: "var(--primary-color)" }}>{form.code}</td>
                <td style={{ fontWeight: "500" }}>{form.name}</td>
                <td>
                  <span className={`badge ${form.category === 'GST' ? 'badge-success' : form.category === 'Ministry of Corporate Affairs' ? 'badge-info' : 'badge-primary'}`}>
                    {form.category}
                  </span>
                </td>
                <td>
                  <a 
                    href={form.action} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--secondary-color)",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    Access Portal
                    <svg style={{ width: "13px", height: "13px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "40px" }}>Filing Assistance</h2>
      <p>
        Need help preparing these forms or running the offline utilities? Our compliance specialists are available to organize your files, verify calculations, and handle submissions securely. Submit your queries through our <Link href="/enquiry" style={{ color: "var(--secondary-color)", fontWeight: "600", textDecoration: "underline" }}>Enquiry Portal</Link>.
      </p>
    </InnerPageLayout>
  );
}
