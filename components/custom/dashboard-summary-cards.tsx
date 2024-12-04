import { fetchDashboardStats } from "@/lib/fetchers";
import SummaryCard from "./summary-card";

export default async function DashboardSummaryCards() {
  const data = await fetchDashboardStats().catch((err) => {
    console.error(err);
    return {
      totalEmployees: 0,
      totalDepartments: 0,
      totalPositions: 0,
      estimatedMonthlyPayroll: 0,
    };
  });

  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      <SummaryCard
        description="Total Employees"
        value={data.totalEmployees}
        type="number"
      />
      <SummaryCard description="Total Departments" value={data.totalDepartments} type="number" />
      <SummaryCard description="Total Positions" value={data.totalPositions} type="number" />
      <SummaryCard
        description="Estimated Monthly Payroll"
        value={data.estimatedMonthlyPayroll}
        type="currency"
      />
    </div>
  );
}
