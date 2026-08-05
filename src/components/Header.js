"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Track scroll position to hide top bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        setScrolled(true);
      } else if (currentScrollY <= 10) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "About Us",
      path: "/about",
      dropdown: [
        { name: "Profile", path: "/about" },
        { name: "Vision", path: "/vision" },
        { name: "Mission", path: "/mission" },
        { name: "Our Team", path: "/team" },
      ],
    },
    {
      name: "Services",
      path: "#",
      dropdown: [
        { name: "Accounting & Outsourcing", path: "/services/accounting-outsourcing" },
        { name: "Audit & Assurance", path: "/services/audit-assurance" },
        { name: "Business Finance & Loan", path: "/services/business-finance-loan" },
        { name: "Consultancy Services", path: "/services/consultancy" },
        { name: "Goods & Service Tax (GST)", path: "/services/gst" },
        { name: "Income Tax", path: "/services/income-tax" },
      ],
    },
    {
      name: "Utilities",
      path: "#",
      dropdown: [
        { name: "Acts & Rules", path: "/acts-rules" },
        { name: "Forms", path: "/forms" },
        { name: "CPE Status", path: "/cpe-status" },
        { name: "Tax & EMI Calculators", path: "/calculators" },
      ],
    },
    {
      name: "Engagement",
      path: "#",
      dropdown: [
        { name: "Careers", path: "/career" },
        { name: "Enquiry Form", path: "/enquiry" },
        { name: "Empanelment", path: "/empanelment" },
      ],
    },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className="container">
          <div className={styles.topbarInner}>
            <div className={styles.topbarLeft}>
              <span className={styles.topInfo}>
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href="mailto:cachintankakkad@gmail.com">cachintankakkad@gmail.com</a>
              </span>
              <span className={styles.topInfo}>
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <a href="tel:+919409207388">+91 94092 07388</a>
              </span>
            </div>
            <div className={styles.topbarRight}>
              <span>Chartered Accountants</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={styles.navbar}>
        <div className="container">
          <div className={styles.navbarInner}>
            <Link href="/" className={styles.logoContainer}>
              <img src="/logo.png" alt="C S Kakkad & Associates Logo" className={styles.logo} />
              <div className={styles.brandInfo}>
                <span className={styles.brandName}>C S Kakkad & Associates</span>
                <span className={styles.brandTitle}>Chartered Accountants</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <ul className={styles.navList}>
                {navLinks.map((link, idx) => (
                  <li key={idx} className={`${styles.navItem} ${link.dropdown ? styles.hasDropdown : ""}`}>
                    {link.dropdown ? (
                      <>
                        <button 
                          className={`${styles.navButton} ${pathname.startsWith(link.path) && link.path !== "#" ? styles.active : ""}`}
                          onClick={() => toggleDropdown(link.name)}
                        >
                          {link.name}
                          <svg className={styles.chevron} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        <ul className={styles.dropdownMenu}>
                          {link.dropdown.map((sublink, subIdx) => (
                            <li key={subIdx}>
                              <Link 
                                href={sublink.path} 
                                className={`${styles.dropdownLink} ${pathname === sublink.path ? styles.activeDropdownLink : ""}`}
                              >
                                {sublink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link 
                        href={link.path} 
                        className={`${styles.navLink} ${pathname === link.path ? styles.active : ""}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Hamburger Menu Button */}
            <button 
              className={styles.hamburger} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.lineOpen1 : ""}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.lineOpen2 : ""}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.lineOpen3 : ""}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className={styles.mobileOverlay} 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ""}`}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogoContainer}>
            <img src="/logo.png" alt="Logo" className={styles.drawerLogo} />
            <div className={styles.drawerBrandInfo}>
              <span className={styles.drawerBrandName}>C S Kakkad & Associates</span>
              <span className={styles.drawerBrandTitle}>CHARTERED ACCOUNTANTS</span>
            </div>
          </div>
          <button 
            className={styles.drawerCloseBtn} 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body - Navigation Links */}
        <div className={styles.mobileNavContainer}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link, idx) => (
              <li key={idx} className={styles.mobileNavItem}>
                {link.dropdown ? (
                  <>
                    <button 
                      className={styles.mobileNavButton}
                      onClick={() => toggleDropdown(link.name)}
                    >
                      {link.name}
                      <svg className={`${styles.mobileChevron} ${activeDropdown === link.name ? styles.chevronRotate : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <ul className={`${styles.mobileDropdown} ${activeDropdown === link.name ? styles.dropdownOpen : ""}`}>
                      {link.dropdown.map((sublink, subIdx) => (
                        <li key={subIdx}>
                          <Link href={sublink.path} className={styles.mobileDropdownLink}>
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={link.path} className={styles.mobileNavLink}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Drawer Footer - Contact Info */}
        <div className={styles.drawerFooter}>
          <h4 className={styles.drawerFooterTitle}>Contact Info</h4>
          <p className={styles.drawerFooterText}>
            <strong>Email:</strong> <a href="mailto:cachintankakkad@gmail.com">cachintankakkad@gmail.com</a>
          </p>
          <p className={styles.drawerFooterText}>
            <strong>Phone:</strong> <a href="tel:+919409207388">94092 07388</a>
          </p>
          
          <h4 className={styles.drawerFooterTitle} style={{ marginTop: "14px" }}>Our Offices</h4>
          <p className={styles.drawerFooterText} style={{ fontSize: "0.75rem" }}>
            <strong>Dwarka:</strong> Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate
          </p>
          <p className={styles.drawerFooterText} style={{ fontSize: "0.75rem", marginTop: "4px" }}>
            <strong>Surajkaradi:</strong> Nr. Navneet Hotel, Okha Highway Road
          </p>
        </div>
      </div>
    </header>
  );
}
