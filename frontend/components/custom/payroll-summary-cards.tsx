import { PayrollReportPeriod } from "@/interfaces";
import SummaryCard from "./summary-card";
import { fetchPayrollSummary } from "@/lib/fetchers";

export default async function PayrollSummaryCards({
  period,
}: {
  period: PayrollReportPeriod;
}) {
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
    <div className="flex items-center justify-start w-full h-full gap-4">
      <SummaryCard
        description="Total Payroll"
        value={payrollSummary.total_payroll}
        type="currency"
      />
      <SummaryCard
        description="Total Retentions"
        value={payrollSummary.total_retentions}
        type="currency"
      />
      <SummaryCard
        description="Average Salary"
        value={payrollSummary.average_salary}
        type="currency"
      />
      <SummaryCard
        description="Average Retentions"
        value={payrollSummary.average_retentions}
        type="currency"
      />
    </div>
  );
}
