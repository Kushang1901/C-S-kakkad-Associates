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

  // Income Tax Calculator State
  const [taxIncome, setTaxIncome] = useState("");
  const [taxDeductions, setTaxDeductions] = useState("");
  const [taxResult, setTaxResult] = useState(null);

  // Loan EMI Calculator State
  const [loanPrincipal, setLoanPrincipal] = useState("");
  const [loanInterest, setLoanInterest] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emiResult, setEmiResult] = useState(null);

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

  // 2. Income Tax Calculation (FY 2026-27 / AY 2027-28 slabs)
  const calculateIncomeTax = (e) => {
    e.preventDefault();
    const grossIncome = parseFloat(taxIncome);
    if (isNaN(grossIncome) || grossIncome <= 0) return;

    const deductions = parseFloat(taxDeductions) || 0;

    // --- NEW REGIME CALCULATION (FY 2026-27 / AY 2027-28) ---
    // Standard Deduction: 75,000
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, grossIncome - newStdDeduction);
    let newBaseTax = 0;

    if (newTaxableIncome > 1500000) {
      newBaseTax += (newTaxableIncome - 1500000) * 0.3 + 150000;
    } else if (newTaxableIncome > 1200000) {
      newBaseTax += (newTaxableIncome - 1200000) * 0.2 + 90000;
    } else if (newTaxableIncome > 1000000) {
      newBaseTax += (newTaxableIncome - 1000000) * 0.15 + 60000;
    } else if (newTaxableIncome > 700000) {
      newBaseTax += (newTaxableIncome - 700000) * 0.1 + 30000;
    } else if (newTaxableIncome > 300000) {
      newBaseTax += (newTaxableIncome - 300000) * 0.05;
    }

    // New Regime Sec 87A Rebate: Tax is zero if taxable income <= 7,00,000
    if (newTaxableIncome <= 700000) {
      newBaseTax = 0;
    }
    const newCess = newBaseTax * 0.04;
    const newTotalTax = newBaseTax + newCess;

    // --- OLD REGIME CALCULATION (FY 2026-27 / AY 2027-28) ---
    // Standard Deduction: 50,000
    const oldStdDeduction = 50000;
    const oldTaxableIncome = Math.max(0, grossIncome - oldStdDeduction - deductions);
    let oldBaseTax = 0;

    if (oldTaxableIncome > 1000000) {
      oldBaseTax += (oldTaxableIncome - 1000000) * 0.3 + 112500;
    } else if (oldTaxableIncome > 500000) {
      oldBaseTax += (oldTaxableIncome - 500000) * 0.2 + 12500;
    } else if (oldTaxableIncome > 250000) {
      oldBaseTax += (oldTaxableIncome - 250000) * 0.05;
    }

    // Old Regime Sec 87A Rebate: Tax is zero if taxable income <= 5,00,000
    if (oldTaxableIncome <= 500000) {
      oldBaseTax = 0;
    }
    const oldCess = oldBaseTax * 0.04;
    const oldTotalTax = oldBaseTax + oldCess;

    setTaxResult({
      newTaxable: newTaxableIncome.toFixed(0),
      newBase: newBaseTax.toFixed(0),
      newCess: newCess.toFixed(0),
      newTotal: newTotalTax.toFixed(0),
      oldTaxable: oldTaxableIncome.toFixed(0),
      oldBase: oldBaseTax.toFixed(0),
      oldCess: oldCess.toFixed(0),
      oldTotal: oldTotalTax.toFixed(0),
      savings: Math.abs(oldTotalTax - newTotalTax).toFixed(0),
      recommendedRegime: newTotalTax <= oldTotalTax ? "New Tax Regime" : "Old Tax Regime",
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
          Income Tax Calculator
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
                <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
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

      {/* 2. Income Tax Calculator View */}
      {activeTab === "tax" && (
        <div className={styles.calculatorBlock}>
          <div className={styles.calcGrid}>
            <form onSubmit={calculateIncomeTax} className={styles.calcForm}>
              <h3 className={styles.calcSub}>Income Tax Estimator (FY 2026-27)</h3>
              <div className="form-group">
                <label className="form-label">Gross Annual Income (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 1200000"
                  value={taxIncome}
                  onChange={(e) => setTaxIncome(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deductions (80C, 80D, HRA etc. - Old Regime Only) (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 150000 (Max 80C is 1.5L)"
                  value={taxDeductions}
                  onChange={(e) => setTaxDeductions(e.target.value)}
                  className="form-control"
                />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                  *Standard deductions (75k for New, 50k for Old) are applied automatically.
                </span>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "12px" }}>
                Compare Regimes
              </button>
            </form>

            <div className={styles.calcResults}>
              <h3 className={styles.calcSub}>Regime Comparison (AY 2027-28)</h3>
              {taxResult ? (
                <div className={styles.resultsList}>
                  <div className={styles.tableResponsive}>
                    <table className="table-custom">
                      <thead>
                        <tr>
                          <th>Particulars</th>
                          <th>New Regime</th>
                          <th>Old Regime</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Taxable Income</td>
                          <td>₹{taxResult.newTaxable}</td>
                          <td>₹{taxResult.oldTaxable}</td>
                        </tr>
                        <tr>
                          <td>Base Tax</td>
                          <td>₹{taxResult.newBase}</td>
                          <td>₹{taxResult.oldBase}</td>
                        </tr>
                        <tr>
                          <td>Cess (4%)</td>
                          <td>₹{taxResult.newCess}</td>
                          <td>₹{taxResult.oldCess}</td>
                        </tr>
                        <tr style={{ fontWeight: "700" }}>
                          <td>Total Tax Payable</td>
                          <td style={{ color: taxResult.recommendedRegime === "New Tax Regime" ? "var(--secondary-color)" : "inherit" }}>
                            ₹{taxResult.newTotal}
                          </td>
                          <td style={{ color: taxResult.recommendedRegime === "Old Tax Regime" ? "var(--secondary-color)" : "inherit" }}>
                            ₹{taxResult.oldTotal}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.recommendationBox}>
                    <h4>Recommended Option: <strong>{taxResult.recommendedRegime}</strong></h4>
                    {parseFloat(taxResult.savings) > 0 ? (
                      <p>You can save approximately <strong>₹{taxResult.savings}</strong> by choosing this regime.</p>
                    ) : (
                      <p>Both tax regimes result in equivalent tax liability for this income slab.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.placeholderMsg}>
                  Input your annual CTC salary and investments to view a side-by-side tax liability comparison.
                </div>
              )}
            </div>
          </div>
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
                    <div style={{ display: "flex", gap: "16px", marginTop: "10px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
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
