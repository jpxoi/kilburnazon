import { PayrollSummaryModel } from "@/interfaces";
import PayrollSummaryCard from "./payroll-summary-card";

export default function PayrollSummaryCards({
  payrollSummary,
}: {
  payrollSummary: PayrollSummaryModel;
}) {
  return (
    <div className="flex items-center justify-start w-full h-full gap-4">
      <PayrollSummaryCard
        description="Total Payroll"
        value={payrollSummary.total_payroll}
      />
      <PayrollSummaryCard
        description="Total Retentions"
        value={payrollSummary.total_retentions}
      />
      <PayrollSummaryCard
        description="Average Salary"
        value={payrollSummary.average_salary}
      />
      <PayrollSummaryCard
        description="Average Retentions"
        value={payrollSummary.average_retentions}
      />
    </div>
  );
}
