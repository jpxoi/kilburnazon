import Search from "../custom/search";
import { Skeleton } from "../ui/skeleton";

export default function EmployeeSearchFiltersSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-start gap-4">
      <div className="flex items-center gap-4 min-w-80">
        <Search placeholder="Loading..." disabled />
      </div>
      <div className="flex flex-row items-start lg:items-center gap-2 flex-wrap">
        <Skeleton className="w-[150px] h-10" />
        <Skeleton className="w-[150px] h-10" />
        <Skeleton className="w-[150px] h-10" />
      </div>
    </div>
  );
}
