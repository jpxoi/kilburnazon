import EmployeeCardSkeleton from "./employee-card-skeleton";

export default function EmployeeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
      <EmployeeCardSkeleton />
    </div>
  );
}
