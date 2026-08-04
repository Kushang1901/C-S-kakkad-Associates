"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import NewsModal from "@/components/NewsModal";
import EnquiryModal from "@/components/EnquiryModal";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      tag: "Trusted Financial Partner",
      title: "Delivering Excellence in Auditing, Taxation & Advisory",
      desc: "Welcome to C S Kakkad & Associates. We provide customized financial strategies and compliant tax planning for businesses, startups, and individuals to grow securely."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      tag: "Statutory Auditing",
      title: "Rigorous Audits for Fulfilling Compliance Standards",
      desc: "Ensure transparent, legally compliant audit systems that strengthen your business integrity, build stakeholder trust, and fulfill RBI and CAG requirements."
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
      tag: "Taxation & Legal Compliance",
      title: "Strategic Income Tax & GST Compliance Planning",
      desc: "Navigate complex Indian tax laws effortlessly. We optimize your tax returns, handle audits, and minimize regulatory liabilities."
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      tag: "Financial Consulting",
      title: "Expert Consultancy and Business Loan Syndication",
      desc: "Secure project finances, commercial loans, and working capital. Our consultants structure your business models for long-term growth."
    }
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500); // Match CSS fade-out transition duration
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Fetch live tax news circulars for the horizontal updates bar
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to load news for marquee:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const services = [
    {
      title: "Accounting & Outsourcing",
      desc: "Comprehensive bookkeeping, payroll management, accounts preparation, and outsourcing services tailored to streamline your business operations.",
      path: "/services/accounting-outsourcing",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      title: "Audit & Assurance",
      desc: "Statutory audits, tax audits, internal audits, and risk assessment services to ensure compliance and strengthen financial credibility.",
      path: "/services/audit-assurance",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    {
      title: "Business Finance & Loan",
      desc: "Project financing, term loans, working capital assistance, and comprehensive loan syndication advisory to power business growth.",
      path: "/services/business-finance-loan",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      )
    },
    {
      title: "Consultancy Services",
      desc: "Expert advisory on corporate structuring, financial management, startup handholding, and business process improvements.",
      path: "/services/consultancy",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: "Goods & Service Tax (GST)",
      desc: "GST registration, monthly compliance management, input tax credit audits, annual return filings, and representation in GST disputes.",
      path: "/services/gst",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2-2 4 4m0-7l-2-2-4 4m5.757-3.043A9 9 0 1112 3v1.5"></path>
        </svg>
      )
    },
    {
      title: "Income Tax",
      desc: "Corporate and individual tax planning, ITR filing, TDS compliance, Transfer Pricing advisory, and litigation support before tax authorities.",
      path: "/services/income-tax",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section with Left-to-Right Image Slider */}
      <section className={styles.hero}>
        {/* Sliding background container */}
        <div 
          className={styles.heroBackgroundWrapper} 
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={styles.heroBackgroundImage}
              style={{ 
                backgroundImage: `linear-gradient(135deg, rgba(10, 37, 64, 0.94) 0%, rgba(15, 76, 129, 0.8) 100%), url(${slide.image})` 
              }}
            />
          ))}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          {/* Animated Hero Content */}
          <div className={`${styles.heroContent} ${isTransitioning ? styles.fadeText : ""}`}>
            <span className={styles.heroTag}>{slides[currentSlide].tag}</span>
            <h1 className={styles.heroTitle}>{slides[currentSlide].title}</h1>
            <p className={styles.heroDesc}>{slides[currentSlide].desc}</p>
            <div className={styles.heroButtons}>
              <button onClick={() => setIsEnquiryModalOpen(true)} className="btn btn-secondary">Book Consultation</button>
              <Link href="/about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Learn More</Link>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className={styles.sliderIndicators}>
          {slides.map((_, idx) => (
            <button 
              key={idx}
              className={`${styles.indicatorDot} ${currentSlide === idx ? styles.indicatorActive : ""}`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(idx);
                  setIsTransitioning(false);
                }, 300);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Tax Ticker / Marquee Section */}
      <section className={styles.marqueeSection}>
        <div className="container">
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTitle}>Tax Calendar & Updates</div>
            <div className={styles.tickerWrapper}>
              <div className={styles.ticker}>
                {loading ? (
                  <div className={styles.tickerItem}>
                    <span className={styles.tickerBullet}></span>
                    <span>Connecting to live tax updates...</span>
                  </div>
                ) : news.length > 0 ? (
                  [...news, ...news].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={styles.tickerItem} 
                      onClick={() => setSelectedNews(item)}
                    >
                      <span className={styles.tickerBullet}></span>
                      <span className={styles.tickerDate}>{item.date}:</span>
                      <span>{item.title}</span>
                    </div>
                  ))
                ) : (
                  <div className={styles.tickerItem}>
                    <span className={styles.tickerBullet}></span>
                    <span>No active updates. Check back later.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome / Partner Section */}
      <section className="section">
        <div className="container">
          <div className={`grid-2 ${styles.welcomeGrid}`}>
            <div className={styles.welcomeText}>
              <h2 style={{ marginBottom: "20px", fontSize: "2rem" }}>C S Kakkad & Associates</h2>
              <div className={styles.partnerHighlight}>
                Led by CA Chintan S. Kakkad (F.C.A., B.Com)
              </div>
              <p>
                C S Kakkad & Associates is a premium Chartered Accountancy firm based in Dwarka and Surajkaradi. Under the leadership of CA Chintan S. Kakkad, we have established a reputation for robust auditing, strategic tax consultation, and comprehensive business financial services.
              </p>
              <p>
                Our team comprises highly qualified specialists in GST compliance, income tax planning, and banking financial syndication. We leverage cutting-edge technology and thorough research of regulatory frameworks to offer seamless services to corporations, partnership firms, and individual taxpayers.
              </p>
              <p>
                We focus on building long-term relationships through professional integrity, proactive advice, and strict client confidentiality. Whether you require standard bookkeeping or representation in tax disputes, we support your goals with diligence.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statVal}>15+</div>
                  <div className={styles.statLabel}>Years Exp</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statVal}>500+</div>
                  <div className={styles.statLabel}>Clients</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statVal}>100%</div>
                  <div className={styles.statLabel}>Compliance</div>
                </div>
              </div>
            </div>
            <div className={styles.welcomeImgBlock}>
              <div className={styles.cardMockup}>
                <div className={styles.cardHead}>
                  <img src="/logo.png" alt="CA Logo" className={styles.cardLogo} />
                  <h3 className={styles.cardName}>C S Kakkad & Associates</h3>
                  <span className={styles.cardSub}>Chartered Accountant</span>
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.cardDetailItem}>
                    <svg className={styles.cardIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <div>
                      <strong>CA Chintan S. Kakkad</strong><br />
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>F.C.A., B.Com</span>
                    </div>
                  </div>
                  <div className={styles.cardDetailItem}>
                    <svg className={styles.cardIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    <div>
                      <strong>Office (Dwarka):</strong><br />
                      Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate, Dwarka - 361335
                    </div>
                  </div>
                  <div className={styles.cardDetailItem}>
                    <svg className={styles.cardIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <div>
                      <strong>Email:</strong><br />
                      <a href="mailto:cachintankakkad@gmail.com" style={{ color: "var(--primary-color)" }}>cachintankakkad@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>We provide standard financial compliance services designed to secure, verify, and scale your business operations.</p>
          </div>
          <div className="grid-3">
            {services.map((service, idx) => (
              <div key={idx} className="card">
                <div className={styles.serviceIconWrapper}>
                  {service.icon}
                </div>
                <h3 className={`serviceTitle ${styles.serviceTitle}`}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <Link href={service.path} className={styles.serviceLink}>
                  <span>Read Detailed Service</span>
                  <svg className={styles.serviceLinkIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose C S Kakkad & Associates</h2>
            <p>Our commitment to standards and diligence shapes how we deliver results for you.</p>
          </div>
          <div className="grid-4">
            <div className={`card ${styles.valueCard}`}>
              <svg className={styles.valueIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h3>Uncompromised Integrity</h3>
              <p>We adhere to strict ethical and professional guidelines defined by the ICAI, ensuring honest reporting.</p>
            </div>
            <div className={`card ${styles.valueCard}`}>
              <svg className={styles.valueIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <h3>Deep Expertise</h3>
              <p>With years of statutory and taxation practice, we handle complex financial situations with deep knowledge.</p>
            </div>
            <div className={`card ${styles.valueCard}`}>
              <svg className={styles.valueIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h3>Proactive Advisory</h3>
              <p>We help businesses save taxes legally by analyzing financial trends and providing strategic insights early.</p>
            </div>
            <div className={`card ${styles.valueCard}`}>
              <svg className={styles.valueIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <h3>Technology Integrated</h3>
              <p>We use state-of-the-art secure digital utilities for bookkeeping, reporting, and audit processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Streamline Your Tax & Finances?</h2>
            <p>Get in touch with CA Chintan S. Kakkad for a secure review of your company's accounts and compliance requirements.</p>
            <div className={styles.ctaButtons}>
              <Link href="/enquiry" className="btn btn-secondary">Submit Enquiry</Link>
              <Link href="/contact" className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      {/* News popup modal details */}
      {selectedNews && (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      )}

      {/* Enquiry popup modal */}
      <EnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />
    </div>
  );
}
