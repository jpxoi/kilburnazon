import { fetchAbsenteeismReport } from "@/lib/fetchers";
import { DataTable } from "./absenteeism-report-table/data-table";
import { columns } from "./absenteeism-report-table/columns";

export default async function AbsenteeismReportTableContainer({
  period,
}: {
  period: "monthly" | "quarterly" | "yearly";
}) {
  const data = await fetchAbsenteeismReport(period).catch((err) => {
    console.error(err);
    return [];
  });
  return <DataTable columns={columns} data={data} />;
}
