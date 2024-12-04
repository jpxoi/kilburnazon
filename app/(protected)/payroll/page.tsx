import { columns } from "@/components/custom/payroll-table/columns";
import { DataTable } from "@/components/custom/payroll-table/data-table";
import { fetchPayrollEntries, fetchPayrollSummary } from "@/lib/fetchers";
import { Suspense } from "react";
import PayrollSummaryCards from "@/components/custom/payroll-summary-cards";
import PayrollSummaryCardsSkeleton from "@/components/skeleton/payroll-summary-cards-skeleton";
import Loader from "@/components/custom/loader";
import { PayrollReportPeriod } from "@/interfaces";
import PayrollPeriodSelect from "@/components/custom/payroll-period-select";
import SaveToPDFButton from "@/components/custom/save-to-pdf";
import SaveToCSVButton from "@/components/custom/save-to-csv";

export default async function PayrollListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const period = (await searchParams).period as unknown as
    | PayrollReportPeriod
    | "this_month";

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
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <div className="flex items-center justify-start gap-4">
          <PayrollPeriodSelect />
          <Suspense fallback={null}>
            <div className="flex items-center justify-start gap-2">
              <SaveToPDFButton data={payrollEntries} summary={payrollSummary} />
              <SaveToCSVButton data={payrollEntries} />
            </div>
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full h-full gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Summary</h2>
        </div>
        <Suspense fallback={<PayrollSummaryCardsSkeleton />}>
          <PayrollSummaryCards payrollSummary={payrollSummary} />
        </Suspense>
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Payroll Entries</h2>
        </div>
        <Suspense
          fallback={<p className="text-sm font-semibold">Loading...</p>}
        >
          <DataTable columns={columns} data={payrollEntries} />
        </Suspense>
      </div>
    </div>
  );
}
