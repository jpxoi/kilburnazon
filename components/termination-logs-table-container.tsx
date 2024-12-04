import { fetchTerminationLogs } from "@/lib/fetchers";
import { columns } from "./custom/logs-table/columns";
import { DataTable } from "./custom/logs-table/data-table";

export default async function TerminationLogsTableContainer() {
  const terminationLogs = await fetchTerminationLogs().catch((err) => {
    console.error(err);
    return [];
  });
  return <DataTable columns={columns} data={terminationLogs} />;
}
