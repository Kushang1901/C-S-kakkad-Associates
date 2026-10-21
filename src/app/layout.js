import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingWidgets from "@/components/FloatingWidgets";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.cachintankakkad.in"),
  title: {
    default: "C S Kakkad & Associates | Chartered Accountants",
    template: "%s | C S Kakkad & Associates",
  },
  description: "C S Kakkad & Associates is a leading Chartered Accountancy firm in Dwarka and Surajkaradi offering professional services in auditing, taxation, GST, business finance, and consultancy.",
  keywords: [
    "CS Kakkad",
    "CA Dwarka",
    "Chartered Accountant Dwarka",
    "Tax Consultant Dwarka",
    "Audit and Assurance Dwarka",
    "GST Consultant Dwarka",
    "Chintan Kakkad CA",
    "CA Chintan Kakkad",
    "cachintankakkad.in",
  ],
  alternates: {
    canonical: "https://www.cachintankakkad.in",
  },
  openGraph: {
    title: "C S Kakkad & Associates | Chartered Accountants",
    description: "C S Kakkad & Associates is a leading Chartered Accountancy firm in Dwarka and Surajkaradi offering professional services in auditing, taxation, GST, business finance, and consultancy.",
    url: "https://www.cachintankakkad.in",
    siteName: "C S Kakkad & Associates",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/cs-kakkad-logo.png",
        width: 800,
        height: 600,
        alt: "C S Kakkad & Associates Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "C S Kakkad & Associates | Chartered Accountants",
    description: "Leading Chartered Accountancy firm in Dwarka and Surajkaradi offering auditing, taxation, GST, business finance, and consultancy.",
    images: ["/cs-kakkad-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "C S Kakkad & Associates",
  url: "https://www.cachintankakkad.in",
  logo: "https://www.cachintankakkad.in/cs-kakkad-logo.png",
  image: "https://www.cachintankakkad.in/cs-kakkad-logo.png",
  description: "Chartered Accountancy firm in Dwarka and Surajkaradi providing auditing, taxation, GST, loan syndication, and consultancy.",
  telephone: "+919409207388",
  email: "cachintankakkad@gmail.com",
  founder: {
    "@type": "Person",
    name: "CA Chintan S. Kakkad",
    jobTitle: "Managing Partner & Fellow Chartered Accountant",
  },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate",
      addressLocality: "Dwarka",
      addressRegion: "Gujarat",
      postalCode: "361335",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Nr. Navneet Hotel, Okha Highway Road",
      addressLocality: "Surajkaradi",
      addressRegion: "Gujarat",
      postalCode: "361347",
      addressCountry: "IN",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
