import EmployeeGridSkeleton from "@/components/skeleton/employee-grid-skeleton";
import EmployeeSearchFiltersSkeleton from "@/components/skeleton/employee-search-filters-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <Skeleton className="w-[9.375rem] h-10" />
      </div>
      <EmployeeSearchFiltersSkeleton />
      <EmployeeGridSkeleton />
    </div>
  );
}
