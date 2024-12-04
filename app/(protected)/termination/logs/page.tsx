import { columns } from "@/components/custom/logs-table/columns";
import { DataTableSkeleton } from "@/components/skeleton/data-table-skeleton";
import TerminationLogsTableContainer from "@/components/custom/termination-logs-table-container";
import { Suspense } from "react";

export default function LogTerminationPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Termination Logs</h1>
      </div>
      <div className="flex items-center justify-start w-full h-full gap-4">
        <Suspense
          fallback={<DataTableSkeleton columns={columns} data={[]} rows={10} />}
        >
          <TerminationLogsTableContainer />
        </Suspense>
      </div>
    </div>
  );
}
