import SummaryCard from "@/components/custom/summary-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center justify-center w-full h-full gap-4">
        <SummaryCard description="Total Employees" value={100} type="number" />
        <SummaryCard description="Total Departments" value={5} type="number" />
        <SummaryCard description="Total Positions" value={10} type="number" />
        <SummaryCard description="Estimated Monthly Payroll" value={100000} type="currency" />
      </div>
    </div>
  );
}
