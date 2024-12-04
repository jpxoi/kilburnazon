import { DataTable } from "@/components/custom/payroll-table/data-table";
import { columns } from "@/components/custom/payroll-table/columns";
import { fetchPayrollEntries } from "@/lib/fetchers";
import { PayrollReportPeriod } from "@/interfaces";

export default async function PayrollReportTableContainer({
  period,
}: {
  period: PayrollReportPeriod;
}) {
  const payrollEntries = await fetchPayrollEntries(period).catch((err) => {
    console.error(err);
    return [];
  });
  return <DataTable columns={columns} data={payrollEntries} />;
}
