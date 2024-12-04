"use client"

import { PayrollEntryModel } from "@/interfaces";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "../ui/button";

const generateCSV = (data: PayrollEntryModel[]) => {
  const csvData = data.map((entry) => ({
    ID: entry.id,
    Name: entry.employee.name,
    Department: entry.employee.employee_job.job_role.department.name,
    Job_Title: entry.employee.employee_job.job_role.title,
    Base_Salary: entry.base_salary,
    Bonus: entry.bonus,
    Overtime: entry.overtime,
    Tax_Deduction: entry.tax_deduction,
    Insurance_Deduction: entry.insurance_deduction,
    Retirement_Contribution: entry.retirement_contribution,
    Other_Deductions: entry.other_deductions,
    Net_Pay: entry.net_pay,
    Payroll_Period: entry.payroll_period
      ? new Date(entry.payroll_period.start_date).toLocaleString("en-GB", {
          month: "short",
          year: "numeric",
        })
      : "Unknown",
    Status: entry.payroll_period ? entry.payroll_period.status : "UNKNOWN",
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "payroll_report.csv");
};

export default function SaveToCSVButton({
  data,
}: {
  data: PayrollEntryModel[];
}) {
  return <Button onClick={() => generateCSV(data)}>Export to CSV</Button>;
}
