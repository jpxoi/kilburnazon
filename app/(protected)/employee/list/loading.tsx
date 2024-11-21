import Search from "@/components/custom/search";
import EmployeeGridSkeleton from "@/components/skeleton/employee-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <div className="flex items-center gap-4">
          <Search placeholder="Loading..." />
          <Skeleton className="w-[9.375rem] h-10" />
        </div>
      </div>
      <EmployeeGridSkeleton />
    </div>
  );
}
