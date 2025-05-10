import { Suspense } from "react";
import LeaveRequestsTableContainer from "@/components/custom/leave-requests-table-container";
import { DataTableSkeleton } from "@/components/skeleton/data-table-skeleton";
import { columns } from "@/components/custom/leave-requests-table/columns";

export default function LeaveRequestsPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Leave Requests</h1>
      </div>
      <div className="flex items-center justify-center w-full h-full gap-4">
        <Suspense fallback={<DataTableSkeleton columns={columns} data={[]} />}>
          <LeaveRequestsTableContainer />
        </Suspense>
      </div>
    </div>
  );
}
