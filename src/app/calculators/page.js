"use client";

import { useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./calculators.module.css";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("gst");

  // GST Calculator State
  const [gstAmountInput, setGstAmountInput] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [gstAction, setGstAction] = useState("add");
  const [gstResult, setGstResult] = useState(null);

  // Income Tax / Old vs New Regime Comparison State
  const [taxIncome, setTaxIncome] = useState("");
  const [sec80C, setSec80C] = useState("");
  const [sec80D, setSec80D] = useState("");
  const [homeLoan24b, setHomeLoan24b] = useState("");
  const [hraExemption, setHraExemption] = useState("");
  const [nps80CCD, setNps80CCD] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [showDetailedDeductions, setShowDetailedDeductions] = useState(false);
  const [taxResult, setTaxResult] = useState(null);

  // 1. GST Calculation
  const calculateGst = (e) => {
    e.preventDefault();
    const amount = parseFloat(gstAmountInput);
    if (isNaN(amount) || amount <= 0) return;

    let taxAmount = 0;
    let totalAmount = 0;
    let originalAmount = amount;

    if (gstAction === "add") {
      taxAmount = amount * (gstRate / 100);
      totalAmount = amount + taxAmount;
    } else {
      totalAmount = amount;
      originalAmount = amount / (1 + gstRate / 100);
      taxAmount = amount - originalAmount;
    }

    setGstResult({
      originalAmount: originalAmount.toFixed(2),
      cgst: (taxAmount / 2).toFixed(2),
      sgst: (taxAmount / 2).toFixed(2),
      totalTax: taxAmount.toFixed(2),
      finalAmount: totalAmount.toFixed(2),
    });
  };

  // 2. Comprehensive Old vs New Tax Regime Calculation (Finance Act 2024 / AY 2025-26 & AY 2026-27)
  const calculateIncomeTax = (e) => {
    e.preventDefault();
    const grossIncome = parseFloat(taxIncome);
    if (isNaN(grossIncome) || grossIncome <= 0) return;

    // Cap statutory deductions as per Income Tax Act
    const val80C = Math.min(parseFloat(sec80C) || 0, 150000);
    const val80D = Math.min(parseFloat(sec80D) || 0, 100000);
    const val24b = Math.min(parseFloat(homeLoan24b) || 0, 200000);
    const valHra = parseFloat(hraExemption) || 0;
    const valNps = Math.min(parseFloat(nps80CCD) || 0, 50000);
    const valOther = parseFloat(otherDeductions) || 0;

    const totalOldDeductions = val80C + val80D + val24b + valHra + valNps + valOther;

    // --- NEW TAX REGIME (Section 115BAC) ---
    // Standard Deduction: ₹75,000 for salaried assessees
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, grossIncome - newStdDeduction);
    let newBaseTax = 0;

    if (newTaxableIncome > 1500000) {
      newBaseTax = 150000 + (newTaxableIncome - 1500000) * 0.30;
    } else if (newTaxableIncome > 1200000) {
      newBaseTax = 90000 + (newTaxableIncome - 1200000) * 0.20;
    } else if (newTaxableIncome > 1000000) {
      newBaseTax = 60000 + (newTaxableIncome - 1000000) * 0.15;
    } else if (newTaxableIncome > 700000) {
      newBaseTax = 30000 + (newTaxableIncome - 700000) * 0.10;
    } else if (newTaxableIncome > 300000) {
      newBaseTax = (newTaxableIncome - 300000) * 0.05;
    }

    // Full 87A Rebate under New Regime for taxable income <= 7,00,000
    if (newTaxableIncome <= 700000) {
      newBaseTax = 0;
    }
    const newCess = Math.round(newBaseTax * 0.04);
    const newTotalTax = Math.round(newBaseTax + newCess);

    // --- OLD TAX REGIME ---
    // Standard Deduction: ₹50,000
    const oldStdDeduction = 50000;
    const oldTaxableIncome = Math.max(0, grossIncome - oldStdDeduction - totalOldDeductions);
    let oldBaseTax = 0;

    if (oldTaxableIncome > 1000000) {
      oldBaseTax = 112500 + (oldTaxableIncome - 1000000) * 0.30;
    } else if (oldTaxableIncome > 500000) {
      oldBaseTax = 12500 + (oldTaxableIncome - 500000) * 0.20;
    } else if (oldTaxableIncome > 250000) {
      oldBaseTax = (oldTaxableIncome - 250000) * 0.05;
    }

    // Full 87A Rebate under Old Regime for taxable income <= 5,00,000
    if (oldTaxableIncome <= 500000) {
      oldBaseTax = 0;
    }
    const oldCess = Math.round(oldBaseTax * 0.04);
    const oldTotalTax = Math.round(oldBaseTax + oldCess);

    const savings = Math.abs(oldTotalTax - newTotalTax);
    const winner = newTotalTax <= oldTotalTax ? "New Tax Regime" : "Old Tax Regime";

    setTaxResult({
      grossIncome: grossIncome.toLocaleString("en-IN"),
      totalOldDeductions: totalOldDeductions.toLocaleString("en-IN"),
      newStdDeduction: newStdDeduction.toLocaleString("en-IN"),
      oldStdDeduction: oldStdDeduction.toLocaleString("en-IN"),
      newTaxable: Math.round(newTaxableIncome).toLocaleString("en-IN"),
      oldTaxable: Math.round(oldTaxableIncome).toLocaleString("en-IN"),
      newBase: Math.round(newBaseTax).toLocaleString("en-IN"),
      oldBase: Math.round(oldBaseTax).toLocaleString("en-IN"),
      newCess: newCess.toLocaleString("en-IN"),
      oldCess: oldCess.toLocaleString("en-IN"),
      newTotal: newTotalTax.toLocaleString("en-IN"),
      oldTotal: oldTotalTax.toLocaleString("en-IN"),
      newTotalRaw: newTotalTax,
      oldTotalRaw: oldTotalTax,
      savings: savings.toLocaleString("en-IN"),
      savingsRaw: savings,
      recommendedRegime: winner,
    });
  };

  // 3. Loan EMI Calculation
  const calculateEmi = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanPrincipal);
    const rate = parseFloat(loanInterest);
    const years = parseFloat(loanTenure);

    if (isNaN(principal) || principal <= 0 || isNaN(rate) || rate <= 0 || isNaN(years) || years <= 0) return;

    const r = rate / (12 * 100); // monthly interest rate
    const n = years * 12; // tenure in months

    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    setEmiResult({
      emi: emi.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalPayment: totalPayment.toFixed(0),
      principalPercent: ((principal / totalPayment) * 100).toFixed(0),
      interestPercent: ((totalInterest / totalPayment) * 100).toFixed(0),
    });
  };

  return (
    <InnerPageLayout title="Tax & Financial Calculators" breadcrumbs={[{ name: "Calculators" }]}>
      <h2>Official Utility Calculators</h2>
      <p>
        Perform quick tax estimates, loan EMI breakdowns, and goods & services tax (GST) invoice calculations instantly.
      </p>

      {/* Tabs list */}
      <div className={styles.tabContainer}>
        <button 
          onClick={() => setActiveTab("gst")} 
          className={`${styles.tabBtn} ${activeTab === "gst" ? styles.activeTab : ""}`}
        >
          GST Calculator
        </button>
        <button 
          onClick={() => setActiveTab("tax")} 
          className={`${styles.tabBtn} ${activeTab === "tax" ? styles.activeTab : ""}`}
        >
          Old vs New Tax Regime Comparison
        </button>
        <button 
          onClick={() => setActiveTab("emi")} 
          className={`${styles.tabBtn} ${activeTab === "emi" ? styles.activeTab : ""}`}
        >
          Loan EMI Calculator
        </button>
      </div>

      {/* 1. GST Calculator View */}
      {activeTab === "gst" && (
        <div className={styles.calculatorBlock}>
          <div className={styles.calcGrid}>
            <form onSubmit={calculateGst} className={styles.calcForm}>
              <h3 className={styles.calcSub}>GST Invoice Calculation</h3>
              <div className="form-group">
                <label className="form-label">Base Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={gstAmountInput}
                  onChange={(e) => setGstAmountInput(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">GST Rate (%)</label>
                <select 
                  value={gstRate} 
                  onChange={(e) => setGstRate(parseInt(e.target.value))} 
                  className="form-control"
                >
                  <option value="5">5% (Essential items)</option>
                  <option value="12">12% (Standard goods/services)</option>
                  <option value="18">18% (Standard corporate services)</option>
                  <option value="28">28% (Luxury items)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Action</label>
                <div style={{ display: "flex", gap: "20px", marginTop: "8px", flexWrap: "wrap" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="gstAction" 
                      checked={gstAction === "add"} 
                      onChange={() => setGstAction("add")} 
                    />
                    Add GST (Exclusive)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input 
                      type="radio" 
                      name="gstAction" 
                      checked={gstAction === "remove"} 
                      onChange={() => setGstAction("remove")} 
                    />
                    Remove GST (Inclusive)
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "12px" }}>
                Calculate GST
              </button>
            </form>

            <div className={styles.calcResults}>
              <h3 className={styles.calcSub}>Calculation Breakup</h3>
              {gstResult ? (
                <div className={styles.resultsList}>
                  <div className={styles.resultItem}>
                    <span>Net Amount:</span>
                    <strong>₹{gstResult.originalAmount}</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>CGST (Central):</span>
                    <strong>₹{gstResult.cgst}</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>SGST (State):</span>
                    <strong>₹{gstResult.sgst}</strong>
                  </div>
                  <div className={styles.resultItem} style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "12px" }}>
                    <span>Total GST Amount:</span>
                    <strong style={{ color: "var(--secondary-color)" }}>+ ₹{gstResult.totalTax}</strong>
                  </div>
                  <div className={styles.resultItem} style={{ paddingTop: "12px" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>Total Invoice Value:</span>
                    <strong style={{ fontSize: "1.25rem", color: "var(--primary-color)" }}>₹{gstResult.finalAmount}</strong>
                  </div>
                </div>
              ) : (
                <div className={styles.placeholderMsg}>
                  Enter the base amount and click calculate to view the invoice tax breakup.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Old vs New Tax Regime Comparison View */}
      {activeTab === "tax" && (
        <div className={styles.calculatorBlock}>
          <form onSubmit={calculateIncomeTax}>
            <div className={styles.calcGrid}>
              <div className={styles.calcForm}>
                <h3 className={styles.calcSub}>Income & Investments Input</h3>
                <div className="form-group">
                  <label className="form-label">
                    Gross Annual Income / CTC (₹) <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1200000"
                    value={taxIncome}
                    onChange={(e) => setTaxIncome(e.target.value)}
                    className="form-control"
                    required
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
                    *Standard deduction (₹75,000 for New Regime, ₹50,000 for Old Regime) is auto-deducted.
                  </span>
                </div>

                <div 
                  className={styles.deductionToggle}
                  onClick={() => setShowDetailedDeductions(!showDetailedDeductions)}
                >
                  <span>
                    {showDetailedDeductions ? "▲ Hide" : "▼ Enter"} Eligible Deductions (80C, 80D, HRA, Home Loan)
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--secondary-color)" }}>
                    {showDetailedDeductions ? "Collapse" : "For Old Regime"}
                  </span>
                </div>

                {showDetailedDeductions && (
                  <div className={styles.deductionsBox}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        Section 80C (PPF/EPF/ELSS/LIC)
                      </label>
                      <input
                        type="number"
                        placeholder="Max ₹1,50,000"
                        value={sec80C}
                        onChange={(e) => setSec80C(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        Section 80D (Health Insurance)
                      </label>
                      <input
                        type="number"
                        placeholder="Up to ₹1,00,000"
                        value={sec80D}
                        onChange={(e) => setSec80D(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        Section 24(b) (Home Loan Interest)
                      </label>
                      <input
                        type="number"
                        placeholder="Max ₹2,00,000"
                        value={homeLoan24b}
                        onChange={(e) => setHomeLoan24b(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        HRA (House Rent Exemption)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 120000"
                        value={hraExemption}
                        onChange={(e) => setHraExemption(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        Section 80CCD(1B) (NPS)
                      </label>
                      <input
                        type="number"
                        placeholder="Max ₹50,000"
                        value={nps80CCD}
                        onChange={(e) => setNps80CCD(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: "0.85rem" }}>
                        Other Deductions (80E/80G/80TTA)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 25000"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                  Compare Both Regimes Now
                </button>
              </div>

              {/* Side Info / Slab Info */}
              <div className={styles.calcResults}>
                <h3 className={styles.calcSub}>Key Regime Differences</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "var(--text-dark)", lineHeight: "1.5" }}>
                  <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <strong style={{ color: "#2E7D32" }}>New Tax Regime (Default):</strong>
                    <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                      <li>Standard deduction: <strong>₹75,000</strong></li>
                      <li>Section 87A rebate: <strong>Zero tax up to ₹7.75 Lakh</strong> gross income</li>
                      <li>Lower tax slabs, no investment proofs needed</li>
                    </ul>
                  </div>
                  <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <strong style={{ color: "#1565C0" }}>Old Tax Regime:</strong>
                    <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                      <li>Standard deduction: <strong>₹50,000</strong></li>
                      <li>Allows Chapter VI-A deductions (80C, 80D, HRA, 24b Home Loan)</li>
                      <li>Beneficial if total deductions exceed ₹3.75 - ₹4.25 Lakh</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Results Comparison Block */}
          {taxResult && (
            <div className={styles.regimeCompareWrapper}>
              {/* Verdict Announcement */}
              <div className={`${styles.verdictBanner} ${taxResult.recommendedRegime === "Old Tax Regime" ? styles.verdictBannerOld : ""}`}>
                <div style={{ fontSize: "2rem" }}>
                  {taxResult.recommendedRegime === "New Tax Regime" ? "🎉" : "💡"}
                </div>
                <div>
                  <h4 className={`${styles.verdictTitle} ${taxResult.recommendedRegime === "Old Tax Regime" ? styles.verdictTitleOld : ""}`}>
                    {taxResult.recommendedRegime === "New Tax Regime" 
                      ? `New Tax Regime Saves You ₹${taxResult.savings}!` 
                      : `Old Tax Regime Saves You ₹${taxResult.savings}!`}
                  </h4>
                  <p className={styles.verdictSub}>
                    {taxResult.savingsRaw > 0 
                      ? `Based on your gross income of ₹${taxResult.grossIncome} and claimed deductions of ₹${taxResult.totalOldDeductions}, choosing the ${taxResult.recommendedRegime} yields the lowest tax liability.`
                      : "Both tax regimes yield zero tax liability due to statutory rebates for your income slab."}
                  </p>
                </div>
              </div>

              {/* Side-by-side Cards */}
              <div className={styles.regimesGrid}>
                {/* New Regime Card */}
                <div className={`${styles.regimeCol} ${taxResult.recommendedRegime === "New Tax Regime" ? styles.regimeColWinner : ""}`}>
                  {taxResult.recommendedRegime === "New Tax Regime" && (
                    <span className={styles.winnerTag}>Recommended</span>
                  )}
                  <h4 className={styles.regimeHeading}>New Tax Regime</h4>
                  <p className={styles.regimeFeatures}>Concessional Slabs (Sec 115BAC)</p>
                  <div className={styles.regimeRows}>
                    <div className={styles.regimeRow}>
                      <span>Gross Annual Income:</span>
                      <strong>₹{taxResult.grossIncome}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Standard Deduction:</span>
                      <strong style={{ color: "#2E7D32" }}>- ₹{taxResult.newStdDeduction}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Exemptions & Deductions:</span>
                      <span>Not applicable</span>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Net Taxable Income:</span>
                      <strong>₹{taxResult.newTaxable}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Tax Calculated:</span>
                      <span>₹{taxResult.newBase}</span>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Health & Education Cess (4%):</span>
                      <span>₹{taxResult.newCess}</span>
                    </div>
                    <div className={styles.regimeRowTotal}>
                      <span>Total Tax Payable:</span>
                      <span className={`${styles.totalTaxValue} ${taxResult.recommendedRegime === "New Tax Regime" ? styles.totalTaxValueWinner : ""}`}>
                        ₹{taxResult.newTotal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Old Regime Card */}
                <div className={`${styles.regimeCol} ${taxResult.recommendedRegime === "Old Tax Regime" ? styles.regimeColWinner : ""}`}>
                  {taxResult.recommendedRegime === "Old Tax Regime" && (
                    <span className={styles.winnerTag}>Recommended</span>
                  )}
                  <h4 className={styles.regimeHeading}>Old Tax Regime</h4>
                  <p className={styles.regimeFeatures}>Traditional Slabs + Chapter VI-A</p>
                  <div className={styles.regimeRows}>
                    <div className={styles.regimeRow}>
                      <span>Gross Annual Income:</span>
                      <strong>₹{taxResult.grossIncome}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Standard Deduction:</span>
                      <strong style={{ color: "#2E7D32" }}>- ₹{taxResult.oldStdDeduction}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Eligible Deductions (80C/80D/etc):</span>
                      <strong style={{ color: "#2E7D32" }}>- ₹{taxResult.totalOldDeductions}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Net Taxable Income:</span>
                      <strong>₹{taxResult.oldTaxable}</strong>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Tax Calculated:</span>
                      <span>₹{taxResult.oldBase}</span>
                    </div>
                    <div className={styles.regimeRow}>
                      <span>Health & Education Cess (4%):</span>
                      <span>₹{taxResult.oldCess}</span>
                    </div>
                    <div className={styles.regimeRowTotal}>
                      <span>Total Tax Payable:</span>
                      <span className={`${styles.totalTaxValue} ${taxResult.recommendedRegime === "Old Tax Regime" ? styles.totalTaxValueWinner : ""}`}>
                        ₹{taxResult.oldTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Loan EMI Calculator View */}
      {activeTab === "emi" && (
        <div className={styles.calculatorBlock}>
          <div className={styles.calcGrid}>
            <form onSubmit={calculateEmi} className={styles.calcForm}>
              <h3 className={styles.calcSub}>Loan Monthly EMI Breakdown</h3>
              <div className="form-group">
                <label className="form-label">Loan Amount (Principal) (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 1500000"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 9.5"
                  value={loanInterest}
                  onChange={(e) => setLoanInterest(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tenure (Years)</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "12px" }}>
                Calculate EMI
              </button>
            </form>

            <div className={styles.calcResults}>
              <h3 className={styles.calcSub}>Loan Summary</h3>
              {emiResult ? (
                <div className={styles.resultsList}>
                  <div className={styles.resultItem} style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "12px" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>Monthly EMI:</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--primary-color)" }}>₹{emiResult.emi} / month</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>Principal Amount:</span>
                    <strong>₹{parseFloat(loanPrincipal).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>Total Interest Payable:</span>
                    <strong style={{ color: "var(--secondary-color)" }}>₹{parseFloat(emiResult.totalInterest).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className={styles.resultItem} style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "4px" }}>
                    <span>Total Repayment Amount:</span>
                    <strong style={{ fontSize: "1.1rem" }}>₹{parseFloat(emiResult.totalPayment).toLocaleString("en-IN")}</strong>
                  </div>

                  {/* Percentage distribution visual bar */}
                  <div style={{ marginTop: "24px" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                      Payment Distribution:
                    </span>
                    <div style={{ display: "flex", height: "18px", borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ width: `${emiResult.principalPercent}%`, backgroundColor: "var(--primary-color)" }} title={`Principal: ${emiResult.principalPercent}%`} />
                      <div style={{ width: `${emiResult.interestPercent}%`, backgroundColor: "var(--secondary-color)" }} title={`Interest: ${emiResult.interestPercent}%`} />
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "10px", fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "10px", height: "10px", backgroundColor: "var(--primary-color)", borderRadius: "2px" }} />
                        Principal: {emiResult.principalPercent}%
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "10px", height: "10px", backgroundColor: "var(--secondary-color)", borderRadius: "2px" }} />
                        Interest: {emiResult.interestPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.placeholderMsg}>
                  Enter the principal loan size, interest rate, and years to calculate monthly installments.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </InnerPageLayout>
  );
}
