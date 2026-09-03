import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingWidgets from "@/components/FloatingWidgets";
import Script from "next/script";

export const metadata = {
  title: "C S Kakkad & Associates | Chartered Accountants",
  description: "C S Kakkad & Associates is a leading Chartered Accountancy firm in Dwarka and Surajkaradi offering professional services in auditing, taxation, GST, business finance, and consultancy.",
  keywords: "CS Kakkad, CA Dwarka, Chartered Accountant Dwarka, Tax Consultant Dwarka, Audit and Assurance Dwarka, GST Consultant Dwarka, Chintan Kakkad CA",
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
