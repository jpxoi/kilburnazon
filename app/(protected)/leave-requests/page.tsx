import { DataTable } from "@/components/custom/leave-requests-table/data-table";
import { columns } from "@/components/custom/leave-requests-table/columns";
import { fetchLeaveRequests } from "@/lib/fetchers";

export default async function LeaveRequestsPage() {
  const leaveRequests = await fetchLeaveRequests().catch((err) => {
    console.error(err);
    return [];
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Leave Requests</h1>
      </div>
      <div className="flex items-center justify-start w-full h-full gap-4">
        <DataTable columns={columns} data={leaveRequests} />
      </div>
    </div>
  );
}
