import EmployeeGrid from "@/components/custom/employee-grid";
import Search from "@/components/custom/search";
import { Button } from "@/components/ui/button";
import { EmployeeAPIResponse } from "@/interfaces";
import { PlusIcon } from "lucide-react";

const data = await fetch("http://localhost:8000/api/employee");
let employees = (await data.json()) as EmployeeAPIResponse[];

export default async function EmployeeListPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <div className="flex items-center gap-4">
          <Search placeholder="Search Employees" />
          <Button>
            <PlusIcon size={24} />
            Add Employee
          </Button>
        </div>
      </div>
      <EmployeeGrid employees={employees} query={query} />
    </div>
  );
}
