import { PayrollReportPeriod } from "@/interfaces";
import SaveToPDFButton from "./save-to-pdf";
import SaveToCSVButton from "./save-to-csv";
import { fetchPayrollEntries, fetchPayrollSummary } from "@/lib/fetchers";

export default async function PayrollExportButtons({
  period,
}: {
  period: PayrollReportPeriod;
}) {
  const payrollEntries = await fetchPayrollEntries(period).catch((err) => {
    console.error(err);
    return [];
  });

  const payrollSummary = await fetchPayrollSummary(period).catch((err) => {
    console.error(err);
    return {
      total_payroll: 0,
      total_retentions: 0,
      average_salary: 0,
      average_retentions: 0,
    };
  });

  return (
    <div className="flex items-center justify-start gap-2">
      <SaveToPDFButton data={payrollEntries} summary={payrollSummary} />
      <SaveToCSVButton data={payrollEntries} />
    </div>
  );
}
