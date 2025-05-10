"use client";

import { PayrollEntryModel, PayrollSummaryModel } from "@/interfaces";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "../ui/button";

const generatePDF = (
  data: PayrollEntryModel[],
  summary: PayrollSummaryModel
) => {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.text("Payroll Report", 14, 12);
  doc.setFontSize(10);
  const generatedText = "Generated on: " + new Date().toLocaleString();
  const textWidth = doc.getTextWidth(generatedText);
  doc.text(generatedText, doc.internal.pageSize.width - textWidth - 14, 12);
  doc.setFontSize(12);
  doc.text(
    `Total Payroll: ${new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(summary.total_payroll)}`,
    14,
    25
  );
  doc.text(
    `Average Salary: ${new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(summary.average_salary)}`,
    14,
    32
  );
  doc.text(
    `Total Retentions: ${new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(summary.total_retentions)}`,
    150,
    25
  );
  doc.text(
    `Average Retentions: ${new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(summary.average_retentions)}`,
    150,
    32
  );

  const tableData = data.map((entry) => [
    entry.id,
    entry.employee.name,
    entry.employee.employee_job.job_role.department.name,
    entry.employee.employee_job.job_role.title,
    entry.base_salary === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.base_salary),
    entry.bonus === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.bonus),
    entry.tax_deduction === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.tax_deduction * -1),
    entry.insurance_deduction === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.insurance_deduction * -1),
    entry.retirement_contribution === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.retirement_contribution * -1),
    entry.net_pay === 0
      ? "-"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(entry.net_pay),
    entry.payroll_period
      ? new Date(entry.payroll_period.start_date).toLocaleString("en-GB", {
          month: "short",
          year: "numeric",
        })
      : "Unknown",

    entry.payroll_period ? entry.payroll_period.status : "UNKNOWN",
  ]);

  autoTable(doc, {
    head: [
      [
        "ID",
        "Employee",
        "Department",
        "Job Title",
        "Base Salary",
        "Bonus",
        "Tax Deduction",
        "Insurance Deduction",
        "Retirement Contribution",
        "Net Pay",
        "Payroll Period",
        "Status",
      ],
    ],
    body: tableData,
    startY: 40,
  });

  doc.save("payroll_report.pdf");
};

export default function SaveToPDFButton({
  data,
  summary,
}: {
  data: PayrollEntryModel[];
  summary: PayrollSummaryModel;
}) {
  return (
    <Button onClick={() => generatePDF(data, summary)}>Save to PDF</Button>
  );
}
