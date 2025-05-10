import AbsenteeismPeriodSelect from "@/components/custom/absenteeism-period-select";
import AbsenteeismReportTableContainer from "@/components/custom/absenteeism-report-table-container";
import { columns } from "@/components/custom/absenteeism-report-table/columns";
import DashboardSummaryCards from "@/components/custom/dashboard-summary-cards";
import { DataTableSkeleton } from "@/components/skeleton/data-table-skeleton";
import PayrollSummaryCardsSkeleton from "@/components/skeleton/payroll-summary-cards-skeleton";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period =
    ((await searchParams).period as unknown as
      | "quarterly"
      | "yearly"
      | "monthly") ?? "monthly";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Suspense fallback={<PayrollSummaryCardsSkeleton />}>
        <DashboardSummaryCards />
      </Suspense>
      <div className="flex flex-col items-center justify-between w-full gap-2">
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-xl font-bold">Absenteeism Report</h2>
          <AbsenteeismPeriodSelect />
        </div>
        <div className="flex items-center justify-center w-full h-full gap-2">
          <Suspense
            fallback={
              <DataTableSkeleton columns={columns} data={[]} rows={10} />
            }
          >
            <AbsenteeismReportTableContainer period={period} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
