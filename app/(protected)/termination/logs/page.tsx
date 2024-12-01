import { columns } from "@/components/custom/logs-table/columns"
import { DataTable } from "@/components/custom/logs-table/data-table"
import { fetchTerminationLogs } from "@/lib/fetchers"

export default async function LogTerminationPage() {
  const terminationLogs = await fetchTerminationLogs().catch((err) => {
    console.error(err);
    return [];
  })

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Termination Logs</h1>
      </div>
      <div className="flex items-center justify-start w-full h-full gap-4">
        <DataTable columns={columns} data={terminationLogs} />
      </div>
    </div>
  );
}
