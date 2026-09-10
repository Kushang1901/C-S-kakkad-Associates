import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Helper: Calculate weekend rollover (Section 10 of General Clauses Act)
// If a statutory deadline falls on a Sunday, the due date automatically rolls over to the next business day.
function calculateStatutoryDate(year, monthIndex, statutoryDay) {
  const d = new Date(year, monthIndex, statutoryDay);
  let effectiveDay = statutoryDay;
  let rolledOver = false;

  // If Sunday (0), move to Monday (+1)
  if (d.getDay() === 0) {
    effectiveDay += 1;
    rolledOver = true;
  }

  return {
    day: effectiveDay.toString().padStart(2, "0"),
    originalDay: statutoryDay.toString().padStart(2, "0"),
    rolledOver,
  };
}

// Generate dynamic compliance schedule for any financial year
function generateComplianceSchedule(startYear) {
  const endYear = startYear + 1;

  // Month mapping: Financial Year runs from April (startYear) to March (endYear)
  const fyMonths = [
    { name: "April", index: 3, year: startYear },
    { name: "May", index: 4, year: startYear },
    { name: "June", index: 5, year: startYear },
    { name: "July", index: 6, year: startYear },
    { name: "August", index: 7, year: startYear },
    { name: "September", index: 8, year: startYear },
    { name: "October", index: 9, year: startYear },
    { name: "November", index: 10, year: startYear },
    { name: "December", index: 11, year: startYear },
    { name: "January", index: 0, year: endYear },
    { name: "February", index: 1, year: endYear },
    { name: "March", index: 2, year: endYear },
  ];

  const compliances = [];

  fyMonths.forEach(({ name: monthName, index: mIndex, year: mYear }) => {
    // 1. Monthly Recurring: TDS/TCS Deposit (Statutory due date: 7th)
    const tdsDate = calculateStatutoryDate(mYear, mIndex, 7);
    compliances.push({
      id: `tds_${monthName.toLowerCase()}_${mYear}`,
      month: monthName,
      day: tdsDate.day,
      originalDay: tdsDate.originalDay,
      rolledOver: tdsDate.rolledOver,
      category: "TDS / TCS",
      tagClass: "tagTds",
      title: "TDS / TCS Monthly Deposit (Challan ITNS 281)",
      description: `Deposit of Tax Deducted / Collected at Source for the preceding month via ITNS 281 challan.`,
      penalty: "Interest @ 1.5% per month under Section 201(1A) on delayed remittance.",
      statutoryAct: "Income Tax Act, 1961",
    });

    // 2. Monthly Recurring: GSTR-1 (Statutory due date: 11th)
    const gstr1Date = calculateStatutoryDate(mYear, mIndex, 11);
    compliances.push({
      id: `gstr1_${monthName.toLowerCase()}_${mYear}`,
      month: monthName,
      day: gstr1Date.day,
      originalDay: gstr1Date.originalDay,
      rolledOver: gstr1Date.rolledOver,
      category: "GST",
      tagClass: "tagGst",
      title: "GSTR-1 Monthly Return (Outward Supplies)",
      description: `Filing of outward supplies of goods and services by regular registered taxpayers for the previous month.`,
      penalty: "Late fee ₹50 per day (₹20 for Nil return) under Section 47 of CGST Act.",
      statutoryAct: "CGST Act, 2017",
    });

    // 3. Monthly Recurring: GSTR-3B (Statutory due date: 20th)
    const gstr3bDate = calculateStatutoryDate(mYear, mIndex, 20);
    compliances.push({
      id: `gstr3b_${monthName.toLowerCase()}_${mYear}`,
      month: monthName,
      day: gstr3bDate.day,
      originalDay: gstr3bDate.originalDay,
      rolledOver: gstr3bDate.rolledOver,
      category: "GST",
      tagClass: "tagGst",
      title: "GSTR-3B Monthly Return (Summary & Tax Payment)",
      description: `Filing of summary return of inward/outward supplies and discharge of net tax liability for previous month.`,
      penalty: "Late fee + 18% annual interest on delayed net cash tax payment under Section 50.",
      statutoryAct: "CGST Act, 2017",
    });

    // --- Specific Month Compliances ---

    // April: Q4 TDS return & MSME-1
    if (monthName === "April") {
      const q4Tds = calculateStatutoryDate(mYear, mIndex, 30);
      compliances.push({
        id: `tds_q4_${mYear}`,
        month: monthName,
        day: q4Tds.day,
        category: "TDS / TCS",
        tagClass: "tagTds",
        title: "Quarterly TDS Return Filing (Q4 - Jan to Mar)",
        description: "Submission of quarterly e-TDS statements in Form 24Q (Salary) and Form 26Q (Non-Salary).",
        penalty: "Late filing fee of ₹200/day under Section 234E.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `msme1_${mYear}`,
        month: monthName,
        day: "30",
        category: "MCA / ROC",
        tagClass: "tagMca",
        title: "Form MSME-1 (Half-Yearly Return)",
        description: "Reporting outstanding dues to Micro and Small enterprises exceeding 45 days for the Oct - Mar half-year.",
        penalty: "Statutory fine on company and directors in default under Section 405.",
        statutoryAct: "Companies Act, 2013",
      });
    }

    // May: Statement of Financial Transactions (SFT - Form 61A)
    if (monthName === "May") {
      compliances.push({
        id: `sft_61a_${mYear}`,
        month: monthName,
        day: "31",
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Statement of Financial Transactions (Form 61A)",
        description: "Reporting high-value transactions, cash deposits, credit card expenditures, and mutual fund investments for preceding FY.",
        penalty: "Penalty of ₹500 to ₹1,000 per day of default under Section 271FA.",
        statutoryAct: "Income Tax Act, 1961",
      });
    }

    // June: Advance Tax Q1 (15%) & Form DPT-3
    if (monthName === "June") {
      const adv1 = calculateStatutoryDate(mYear, mIndex, 15);
      compliances.push({
        id: `adv_tax_q1_${mYear}`,
        month: monthName,
        day: adv1.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Advance Tax 1st Installment (15%)",
        description: "Payment of first installment of estimated annual tax liability (15%) for corporate and individual assessees.",
        penalty: "Interest @ 1% per month for deferment under Section 234C.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `dpt3_${mYear}`,
        month: monthName,
        day: "30",
        category: "MCA / ROC",
        tagClass: "tagMca",
        title: "Form DPT-3 (Annual Return of Deposits)",
        description: "Mandatory annual filing of return of deposits or transactions not considered as deposit by companies.",
        penalty: "Statutory penalty under Rule 16 of Companies (Acceptance of Deposits) Rules.",
        statutoryAct: "Companies Act, 2013",
      });
    }

    // July: Non-Audit ITR, Q1 TDS & CMP-08
    if (monthName === "July") {
      const cmp08 = calculateStatutoryDate(mYear, mIndex, 18);
      compliances.push({
        id: `cmp08_q1_${mYear}`,
        month: monthName,
        day: cmp08.day,
        category: "GST",
        tagClass: "tagGst",
        title: "CMP-08 Statement (Composition Dealers - Q1)",
        description: "Quarterly challan statement for payment of self-assessed tax by composition taxpayers for April - June.",
        penalty: "Late fee and interest on delayed tax remittance.",
        statutoryAct: "CGST Act, 2017",
      });
      const itrNonAudit = calculateStatutoryDate(mYear, mIndex, 31);
      compliances.push({
        id: `itr_nonaudit_${mYear}`,
        month: monthName,
        day: itrNonAudit.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Annual ITR Filing for Non-Audit Assessees",
        description: "Annual Income Tax Return filing for individuals, salaried employees, HUFs, and non-audit business entities.",
        penalty: "Late fee of ₹5,000 under Section 234F plus interest under 234A.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `tds_q1_${mYear}`,
        month: monthName,
        day: itrNonAudit.day,
        category: "TDS / TCS",
        tagClass: "tagTds",
        title: "Quarterly TDS Statement (Q1 - Apr to Jun)",
        description: "Quarterly e-TDS return filing for deductions made in first quarter.",
        penalty: "₹200/day under Section 234E.",
        statutoryAct: "Income Tax Act, 1961",
      });
    }

    // September: Advance Tax Q2 (45%), Form 3CD Tax Audit & DIR-3 KYC
    if (monthName === "September") {
      const adv2 = calculateStatutoryDate(mYear, mIndex, 15);
      compliances.push({
        id: `adv_tax_q2_${mYear}`,
        month: monthName,
        day: adv2.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Advance Tax 2nd Installment (45% Cumulative)",
        description: "Payment of second installment (cumulative 45% of annual estimated tax) for corporate and individual assessees.",
        penalty: "Interest @ 1% per month under Section 234C.",
        statutoryAct: "Income Tax Act, 1961",
      });
      const taxAudit = calculateStatutoryDate(mYear, mIndex, 30);
      compliances.push({
        id: `tax_audit_3cd_${mYear}`,
        month: monthName,
        day: taxAudit.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Tax Audit Report (Form 3CA / 3CB - 3CD)",
        description: "Mandatory filing of Tax Audit Report under Section 44AB for businesses and professionals exceeding threshold turnover.",
        penalty: "Penalty of 0.5% of turnover or ₹1,50,000 (whichever is less) under Section 271B.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `dir3_kyc_${mYear}`,
        month: monthName,
        day: taxAudit.day,
        category: "MCA / ROC",
        tagClass: "tagMca",
        title: "Annual DIR-3 KYC Filing for Directors",
        description: "Annual electronic verification of contact credentials and details for all individuals holding an active DIN.",
        penalty: "Deactivation of Director DIN and mandatory ₹5,000 late fee for reactivation.",
        statutoryAct: "Companies Act, 2013",
      });
    }

    // October: Audit ITR, CMP-08 & Q2 TDS
    if (monthName === "October") {
      const cmp08Q2 = calculateStatutoryDate(mYear, mIndex, 18);
      compliances.push({
        id: `cmp08_q2_${mYear}`,
        month: monthName,
        day: cmp08Q2.day,
        category: "GST",
        tagClass: "tagGst",
        title: "CMP-08 Statement (Composition Dealers - Q2)",
        description: "Quarterly challan statement for composition dealers for July - September.",
        penalty: "Late fee + interest.",
        statutoryAct: "CGST Act, 2017",
      });
      const auditItr = calculateStatutoryDate(mYear, mIndex, 31);
      compliances.push({
        id: `itr_audit_${mYear}`,
        month: monthName,
        day: auditItr.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Annual ITR Filing for Tax Audit Assessees",
        description: "Income Tax Return filing for corporate companies, working partners, and businesses subject to statutory tax audit.",
        penalty: "Section 234F penalty and interest under Section 234A.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `tds_q2_${mYear}`,
        month: monthName,
        day: auditItr.day,
        category: "TDS / TCS",
        tagClass: "tagTds",
        title: "Quarterly TDS Statement (Q2 - Jul to Sep)",
        description: "Filing of quarterly e-TDS statements in Form 24Q and 26Q for second quarter.",
        penalty: "₹200 per day under Section 234E.",
        statutoryAct: "Income Tax Act, 1961",
      });
    }

    // November: Form AOC-4 (Financial Statements with ROC)
    if (monthName === "November") {
      compliances.push({
        id: `aoc4_${mYear}`,
        month: monthName,
        day: "30",
        category: "MCA / ROC",
        tagClass: "tagMca",
        title: "Form AOC-4 (Filing Financial Statements with ROC)",
        description: "Filing of audited balance sheet, profit & loss account, and board report with Registrar of Companies.",
        penalty: "₹100 per day of delay under Section 137.",
        statutoryAct: "Companies Act, 2013",
      });
    }

    // December: Advance Tax Q3, GSTR-9/9C & MGT-7
    if (monthName === "December") {
      const adv3 = calculateStatutoryDate(mYear, mIndex, 15);
      compliances.push({
        id: `adv_tax_q3_${mYear}`,
        month: monthName,
        day: adv3.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Advance Tax 3rd Installment (75% Cumulative)",
        description: "Payment of third installment (cumulative 75% of tax liability) for corporate & non-corporate assessees.",
        penalty: "Interest @ 1% per month under Section 234C.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `gstr9_annual_${mYear}`,
        month: monthName,
        day: "31",
        category: "GST",
        tagClass: "tagGst",
        title: "GSTR-9 & GSTR-9C Annual Returns",
        description: "Filing of Annual Return (GSTR-9) and Reconciliation Statement (GSTR-9C) for regular taxpayers.",
        penalty: "Late fee ₹200 per day subject to statutory turnover limits.",
        statutoryAct: "CGST Act, 2017",
      });
      compliances.push({
        id: `mgt7_${mYear}`,
        month: monthName,
        day: "31",
        category: "MCA / ROC",
        tagClass: "tagMca",
        title: "Form MGT-7 / 7A (Annual Return Filing)",
        description: "Filing of Company Annual Return with ROC within 60 days of Annual General Meeting.",
        penalty: "₹100 per day of continuing default under Section 92.",
        statutoryAct: "Companies Act, 2013",
      });
    }

    // January: Q3 TDS & CMP-08
    if (monthName === "January") {
      const cmp08Q3 = calculateStatutoryDate(mYear, mIndex, 18);
      compliances.push({
        id: `cmp08_q3_${mYear}`,
        month: monthName,
        day: cmp08Q3.day,
        category: "GST",
        tagClass: "tagGst",
        title: "CMP-08 Statement (Composition Dealers - Q3)",
        description: "Quarterly challan statement for composition taxpayers for October - December.",
        penalty: "Late fee + interest on unpaid tax.",
        statutoryAct: "CGST Act, 2017",
      });
      compliances.push({
        id: `tds_q3_${mYear}`,
        month: monthName,
        day: "31",
        category: "TDS / TCS",
        tagClass: "tagTds",
        title: "Quarterly TDS Statement (Q3 - Oct to Dec)",
        description: "Filing of quarterly TDS return in Form 24Q & 26Q for third quarter.",
        penalty: "Late filing fee of ₹200 per day under Section 234E.",
        statutoryAct: "Income Tax Act, 1961",
      });
    }

    // March: Advance Tax Final (100%), LUT for Exports & Updated Return (ITR-U)
    if (monthName === "March") {
      const adv4 = calculateStatutoryDate(mYear, mIndex, 15);
      compliances.push({
        id: `adv_tax_q4_${mYear}`,
        month: monthName,
        day: adv4.day,
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Advance Tax 4th & Final Installment (100%)",
        description: "Payment of final installment (100% of estimated annual tax liability) for all eligible taxpayers.",
        penalty: "Interest @ 1% per month under Section 234B & 234C.",
        statutoryAct: "Income Tax Act, 1961",
      });
      compliances.push({
        id: `lut_export_${mYear}`,
        month: monthName,
        day: "31",
        category: "GST",
        tagClass: "tagGst",
        title: "LUT Filing for Zero-Rated Exports (RFD-11)",
        description: "Online submission of Letter of Undertaking for upcoming FY to export goods or services without paying IGST.",
        penalty: "Exports without LUT mandate payment of IGST and refund delays.",
        statutoryAct: "CGST Act, 2017",
      });
      compliances.push({
        id: `itru_deadline_${mYear}`,
        month: monthName,
        day: "31",
        category: "Income Tax",
        tagClass: "tagIt",
        title: "Updated Return (ITR-U) Final Deadline",
        description: "Last date to file updated return for preceding assessment years to disclose omitted income with additional tax.",
        penalty: "Loss of opportunity to regularize undisclosed tax liability.",
        statutoryAct: "Income Tax Act, 1961",
      });
    }
  });

  return compliances;
}

export async function GET() {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0 = Jan, 3 = Apr

    // In India: FY starts on April 1
    // If month is Apr-Dec (index >= 3), startYear = currentYear
    // If month is Jan-Mar (index < 3), startYear = currentYear - 1
    const startYear = currentMonthIndex >= 3 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;

    const months = [
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December", "January", "February", "March"
    ];

    const currentMonthName = now.toLocaleString("en-US", { month: "long" });

    // Generate dynamic schedule
    const compliances = generateComplianceSchedule(startYear);

    const payload = {
      financialYear: `${startYear} - ${endYear}`,
      currentMonth: currentMonthName,
      months,
      categories: ["All", "GST", "Income Tax", "TDS / TCS", "MCA / ROC"],
      compliances,
      generatedAt: now.toISOString(),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to generate compliance data:", error);
    return NextResponse.json(
      { error: "Failed to generate dynamic compliance schedule" },
      { status: 500 }
    );
  }
}
