import Script from "next/script";

export const metadata = {
  title: "Tax & Financial Calculators | Income Tax Regime Comparison, Loan EMI, GST",
  description: "Free official financial calculators by C S Kakkad & Associates. Instant comparison of Old vs New Tax Regime (Section 115BAC), Home & Business Loan EMI breakdowns, and GST invoice calculations.",
  keywords: [
    "Income Tax Calculator India",
    "Old vs New Tax Regime Comparison AY 2025-26",
    "Section 115BAC Calculator",
    "Loan EMI Calculator",
    "Home Loan EMI Calculator India",
    "GST Calculator Online",
    "GST Inclusive Exclusive Calculator",
    "CA Financial Calculators Gujarat",
  ],
  alternates: {
    canonical: "https://www.cachintankakkad.in/calculators",
  },
  openGraph: {
    title: "Official Tax & Financial Calculators | C S Kakkad & Associates",
    description: "Accurate, instant financial calculators for Indian taxpayers and businesses. Compare tax regimes, calculate monthly EMIs, and compute GST invoice values.",
    url: "https://www.cachintankakkad.in/calculators",
    type: "website",
    images: ["/icon-512.png"],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://www.cachintankakkad.in/calculators#tax-calculator",
      name: "Old vs New Income Tax Regime Calculator (Section 115BAC)",
      url: "https://www.cachintankakkad.in/calculators",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description: "Interactive tax calculator comparing Old vs New Tax Regime liabilities under the Finance Act with Section 87A rebate and Chapter VI-A deductions.",
      author: {
        "@type": "AccountingService",
        name: "C S Kakkad & Associates",
        url: "https://www.cachintankakkad.in",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.cachintankakkad.in/calculators#emi-calculator",
      name: "Loan EMI & Interest Repayment Calculator",
      url: "https://www.cachintankakkad.in/calculators",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description: "Calculate monthly Equated Monthly Installments (EMI), total interest payable, and total loan cost for home, personal, and business loans.",
      author: {
        "@type": "AccountingService",
        name: "C S Kakkad & Associates",
        url: "https://www.cachintankakkad.in",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.cachintankakkad.in/calculators#gst-calculator",
      name: "Goods & Services Tax (GST) Invoice Calculator",
      url: "https://www.cachintankakkad.in/calculators",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description: "Calculate GST amounts, CGST, SGST splits, and invoice totals for 5%, 12%, 18%, and 28% tax slabs for both inclusive and exclusive rates.",
      author: {
        "@type": "AccountingService",
        name: "C S Kakkad & Associates",
        url: "https://www.cachintankakkad.in",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.cachintankakkad.in/calculators#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the New Tax Regime differ from the Old Tax Regime under Section 115BAC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The New Tax Regime provides wider tax slabs with lower rates and a standard deduction of ₹75,000 for salaried individuals. It includes a full Section 87A rebate making income up to ₹7.75 Lakh completely tax-free. The Old Tax Regime allows deductions under Section 80C (up to ₹1.5 Lakh), Section 80D (health insurance), Section 24b (home loan interest up to ₹2 Lakh), and HRA exemption, but has higher tax slab rates.",
          },
        },
        {
          "@type": "Question",
          name: "How is Loan EMI calculated mathematically?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EMI is calculated using the reducing balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is Principal loan amount, R is monthly interest rate (annual rate / 12 / 100), and N is the total number of monthly installments. The monthly repayment covers both interest and principal amortization.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate GST for inclusive vs exclusive prices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For GST Exclusive (Add GST): Tax Amount = Base Price x (GST Rate / 100). Total Invoice Value = Base Price + Tax Amount. For GST Inclusive (Remove GST): Base Price = Total Amount / (1 + GST Rate / 100). Tax Amount = Total Amount - Base Price.",
          },
        },
        {
          "@type": "Question",
          name: "When should an individual choose the Old Tax Regime over the New Regime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An individual should generally choose the Old Tax Regime if their aggregate deductions (under Section 80C, 80D, 80CCD NPS, HRA, and Home Loan interest under Section 24b) exceed ₹3.75 Lakh to ₹4.25 Lakh depending on the income slab. For individuals with lower investment proofs, the New Tax Regime is mathematically more beneficial.",
          },
        },
      ],
    },
  ],
};

export default function CalculatorsLayout({ children }) {
  return (
    <>
      <Script
        id="calculators-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      {children}
    </>
  );
}
