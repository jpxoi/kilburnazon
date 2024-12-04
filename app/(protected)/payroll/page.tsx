import { columns } from "@/components/custom/payroll-table/columns";
import { Suspense } from "react";
import PayrollSummaryCards from "@/components/custom/payroll-summary-cards";
import PayrollSummaryCardsSkeleton from "@/components/skeleton/payroll-summary-cards-skeleton";
import { PayrollReportPeriod } from "@/interfaces";
import PayrollPeriodSelect from "@/components/custom/payroll-period-select";
import PayrollExportButtons from "@/components/custom/payroll-export-buttons";
import PayrollReportTableContainer from "@/components/custom/payroll-report-table-container";
import { DataTableSkeleton } from "@/components/skeleton/data-table-skeleton";

export default async function PayrollListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = (await searchParams).period as unknown as
    | PayrollReportPeriod
    | "this_month";
    

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <div className="flex items-center justify-start gap-4">
          <PayrollPeriodSelect />
          <Suspense fallback={null}>
            <PayrollExportButtons period={period} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full h-full gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Summary</h2>
        </div>
        <Suspense fallback={<PayrollSummaryCardsSkeleton />}>
          <PayrollSummaryCards period={period} />
        </Suspense>
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Payroll Entries</h2>
        </div>
        <Suspense fallback={<DataTableSkeleton columns={columns} data={[]} rows={10} />}>
          <PayrollReportTableContainer period={period} />
        </Suspense>
      </div>
    </div>
  );
}
