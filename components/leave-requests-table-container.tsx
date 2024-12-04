import { DataTable } from "@/components/custom/leave-requests-table/data-table";
import { columns } from "@/components/custom/leave-requests-table/columns";
import { fetchLeaveRequests } from "@/lib/fetchers";

export default async function LeaveRequestsTableContainer() {
  const leaveRequests = await fetchLeaveRequests().catch((err) => {
    console.error(err);
    return [];
  });
  return <DataTable columns={columns} data={leaveRequests} />;
}
