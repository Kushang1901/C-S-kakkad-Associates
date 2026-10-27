import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingWidgets from "@/components/FloatingWidgets";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://cachintankakkad.in"),
  title: {
    default: "C S Kakkad & Associates | Chartered Accountants in Dwarka & Gujarat",
    template: "%s | C S Kakkad & Associates",
  },
  description: "C S Kakkad & Associates is a premier Chartered Accountancy firm in Gujarat led by CA Chintan S. Kakkad (F.C.A.). Offering statutory audit, direct tax planning, GST compliance, business loans, CMA data, and financial advisory across Dwarka, Surat, and Gujarat.",
  keywords: [
    "C S Kakkad & Associates",
    "CS Kakkad",
    "CA Chintan Kakkad",
    "CA Dwarka",
    "Chartered Accountant in Dwarka",
    "CA Surat",
    "Tax Consultant Dwarka",
    "Chartered Accountants Gujarat",
    "Best CA in Dwarka Gujarat",
    "Tax Consultant Dwarka",
    "Audit and Assurance Dwarka",
    "GST Consultant Dwarka",
    "Tax Audit Section 44AB",
    "Statutory Audit Gujarat",
    "Business Loan Syndication Gujarat",
    "CMA Data Preparation",
    "Company Incorporation Dwarka",
    "ICAI Fellow Chartered Accountant",
    "cachintankakkad.in",
  ],
  authors: [{ name: "CA Chintan S. Kakkad", url: "https://cachintankakkad.in/team" }],
  creator: "C S Kakkad & Associates",
  publisher: "C S Kakkad & Associates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://cachintankakkad.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "C S Kakkad & Associates | Chartered Accountants",
    description: "Premier Chartered Accountancy firm in Dwarka, Gujarat providing statutory audit, corporate taxation, GST advisory, and business loan syndication.",
    url: "https://cachintankakkad.in",
    siteName: "C S Kakkad & Associates",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "C S Kakkad & Associates Chartered Accountants Logo",
      },
      {
        url: "/cs-kakkad-logo.png",
        width: 120,
        height: 91,
        alt: "C S Kakkad & Associates Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "C S Kakkad & Associates | Chartered Accountants",
    description: "Leading Chartered Accountancy firm in Dwarka, Gujarat offering auditing, taxation, GST, business finance, and consultancy.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Finance & Accounting",
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AccountingService", "FinancialService", "LocalBusiness"],
      "@id": "https://cachintankakkad.in/#organization",
      name: "C S Kakkad & Associates",
      alternateName: [
        "CS Kakkad & Associates",
        "CA Chintan Kakkad",
        "C S Kakkad Chartered Accountants",
        "cachintankakkad.in",
        "CA in Gujarat",
        "Chartered Accountant Surat",
        "Chartered Accountant Dwarka",
      ],
      url: "https://cachintankakkad.in",
      logo: "https://cachintankakkad.in/icon-512.png",
      image: "https://cachintankakkad.in/icon-512.png",
      description: "C S Kakkad & Associates is a distinguished Chartered Accountancy firm based in Gujarat providing statutory auditing, taxation, GST compliance, business finance syndication, and management consultancy across Dwarka, Surat, Ahmedabad, Jamnagar, and Rajkot.",
      telephone: "+919409207388",
      email: "info@cachintankakkad.in",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Cheque, Bank Transfer, UPI",
      founder: {
        "@type": "Person",
        "@id": "https://cachintankakkad.in/#founder",
        name: "CA Chintan S. Kakkad",
        jobTitle: "Founder & Sole Proprietor, Fellow Chartered Accountant",
        honorificPrefix: "CA",
        hasCredential: "Fellow Chartered Accountant (F.C.A.), B.Com",
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Institute of Chartered Accountants of India (ICAI)",
        },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate",
        addressLocality: "Dwarka",
        addressRegion: "Gujarat",
        postalCode: "361335",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.243910,
        longitude: 68.962911,
      },
      hasMap: "https://maps.google.com/?q=C+S+KAKKAD+%26+ASSOCIATES+Dwarka",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "19:30",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Dwarka" },
        { "@type": "City", name: "Surat" },
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "City", name: "Rajkot" },
        { "@type": "City", name: "Jamnagar" },
        { "@type": "City", name: "Vadodara" },
        { "@type": "AdministrativeArea", name: "Devbhumi Dwarka" },
        { "@type": "AdministrativeArea", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Statutory Audits under Companies Act 2013",
        "Tax Audits under Section 44AB of Income Tax Act 1961",
        "Goods and Services Tax (GST) Registration, Filing and ITC Reconciliation",
        "Section 115BAC New Tax Regime vs Old Tax Regime Analysis",
        "Corporate and Personal Income Tax Planning and Appeals",
        "Project Report Formulation and Bank Loan Syndication (CMA Data)",
        "Accounting, Bookkeeping and Payroll Outsourcing",
        "Company, LLP and Partnership Firm Formation with MCA",
        "TDS Compliance, Lower Deduction Certificates and Form 26AS Reconciliation",
        "MSME Udyam Registration and Financial Subsidies in Gujarat",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Chartered Accountancy Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Audit & Assurance",
              url: "https://cachintankakkad.in/services/audit-assurance",
              description: "Statutory audits, tax audits under Sec 44AB, and internal control reviews.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Income Tax Advisory & Filing",
              url: "https://cachintankakkad.in/services/income-tax",
              description: "Corporate and individual ITR filing, capital gains calculation, advance tax, and tax scrutiny representation.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Goods & Services Tax (GST)",
              url: "https://cachintankakkad.in/services/gst",
              description: "GST registration, monthly GSTR-1 & GSTR-3B filings, annual returns, and GSTR-2B input tax credit audit.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Finance & Loan Syndication",
              url: "https://cachintankakkad.in/services/business-finance-loan",
              description: "Commercial loan syndication, bank project reports, CMA data modeling, and working capital credit appraisal.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Corporate Consultancy & Entity Setup",
              url: "https://cachintankakkad.in/services/consultancy",
              description: "Company incorporation, LLP formation, MSME Udyam registration, and ROC statutory filings.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Accounting & Outsourcing",
              url: "https://cachintankakkad.in/services/accounting-outsourcing",
              description: "End-to-end cloud bookkeeping, payroll preparation, TDS deduction, and monthly MIS financial statements.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://cachintankakkad.in/#website",
      url: "https://cachintankakkad.in",
      name: "C S Kakkad & Associates",
      description: "Official portal for C S Kakkad & Associates Chartered Accountants, Dwarka",
      publisher: {
        "@id": "https://cachintankakkad.in/#organization",
      },
      inLanguage: ["en-IN", "gu-IN", "hi-IN"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://cachintankakkad.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What tax services does C S Kakkad & Associates offer for businesses in Dwarka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "C S Kakkad & Associates provides end-to-end business taxation services including GST registration and return filing, corporate income tax strategy, TDS deductions, annual filings, and representation before tax authorities.",
          },
        },
        {
          "@type": "Question",
          name: "Who is required to undergo a Tax Audit under Section 44AB in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under Section 44AB of the Income Tax Act, a tax audit is mandatory for businesses with annual turnover exceeding ₹1 Crore (or ₹10 Crore if cash receipts are under 5%), and for professionals with gross receipts exceeding ₹50 Lakhs.",
          },
        },
        {
          "@type": "Question",
          name: "How does the GST registration process work with C S Kakkad & Associates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The firm handles GST registration completely digitally. All required documents (PAN, Aadhaar KYC, place of business proof, bank details) are compiled, verified, and uploaded to the GST portal, securing the GSTIN within 3 to 7 working days.",
          },
        },
        {
          "@type": "Question",
          name: "Can C S Kakkad & Associates help secure a commercial business loan or bank credit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The firm specializes in Business Finance & Loan Syndication, preparing detailed Project Reports, CMA data (Credit Monitoring Arrangement), and multi-year financial forecasts to secure term loans, CC limits, and working capital from leading commercial banks.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a statutory audit and an internal audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A statutory audit is legally mandated by law to provide a true and fair view of financial statements to external authorities, shareholders, and tax departments. An internal audit evaluates internal checks, prevents financial leakages, and enhances process efficiency for company management.",
          },
        },
        {
          "@type": "Question",
          name: "Does C S Kakkad & Associates provide Chartered Accountancy and tax advisory services in Surat and across Gujarat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, C S Kakkad & Associates serves commercial firms, manufacturing units, diamond and textile businesses, MSMEs, and professionals across Gujarat, including Surat, Ahmedabad, Rajkot, Jamnagar, and Dwarka, providing cloud-enabled digital accounting, statutory tax audits, GST compliance, and bank loan syndication.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better between Old and New Tax Regime under Section 115BAC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The New Tax Regime offers lower tax slab rates and a ₹75,000 standard deduction with zero tax liability up to ₹7.75 Lakh gross annual income under Section 87A rebate. The Old Tax Regime is advantageous if total eligible deductions (Section 80C, 80D, HRA, and Section 24b Home Loan Interest) exceed ₹3.75 Lakh to ₹4.25 Lakh. Our official Tax Regime Calculator provides an instant side-by-side comparison.",
          },
        },
        {
          "@type": "Question",
          name: "What is CMA Data and why is it needed for business bank loans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Credit Monitoring Arrangement (CMA) Data is a comprehensive financial report required by banks to evaluate working capital (Cash Credit/Overdraft) and term loan eligibility. It analyzes past balance sheets, operating statements, MPBF (Maximum Permissible Bank Finance), and financial ratios. C S Kakkad & Associates prepares detailed CMA reports to accelerate loan sanctions.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://cachintankakkad.in/#sitelinks-navigation",
      name: "Main Navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "About Us",
          url: "https://cachintankakkad.in/about",
          description: "Firm history, professional credentials, and leadership.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Audit & Assurance",
          url: "https://cachintankakkad.in/services/audit-assurance",
          description: "Statutory audits, tax audits under Sec 44AB, and internal controls.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Income Tax Advisory",
          url: "https://cachintankakkad.in/services/income-tax",
          description: "Corporate and individual ITR filing, tax planning, and appeals.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Goods & Services Tax (GST)",
          url: "https://cachintankakkad.in/services/gst",
          description: "GST registration, monthly returns, and ITC reconciliation.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Business Finance & Loan Syndication",
          url: "https://cachintankakkad.in/services/business-finance-loan",
          description: "Bank project reports, CMA data modeling, and commercial credit.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Tax & EMI Calculators",
          url: "https://cachintankakkad.in/calculators",
          description: "Interactive tools for Income Tax, Loan EMI, and GST.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Our Team",
          url: "https://cachintankakkad.in/team",
          description: "Meet CA Chintan S. Kakkad (F.C.A.) and our associates.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 8,
          name: "Empanelment",
          url: "https://cachintankakkad.in/empanelment",
          description: "Bank audit empanelment and tender qualifications.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 9,
          name: "Contact Us",
          url: "https://cachintankakkad.in/contact",
          description: "Dwarka head office location and contact details.",
        },
        {
          "@type": "SiteNavigationElement",
          position: 10,
          name: "Sitemap",
          url: "https://cachintankakkad.in/sitemap",
          description: "Comprehensive website directory and XML feeds.",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to Google Translate CDN endpoints to minimize translation latency */}
        <link rel="preconnect" href="https://translate.google.com" />
        <link rel="preconnect" href="https://translate.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://translate.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        {/* Global preloader shown on initial website load */}
        <Preloader />
        
        {/* Core Layout structure */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Floating buttons (scroll to top on left, chatbot commute on right) */}
        <FloatingWidgets />
      </body>
    </html>
  );
}
