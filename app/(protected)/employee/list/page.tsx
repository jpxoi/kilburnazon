import EmployeeGrid from "@/components/custom/employee-grid";
import Search from "@/components/custom/search";
import { Button } from "@/components/ui/button";
import { EmployeeAPIResponse } from "@/interfaces";
import { AlertCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

async function getEmployees() {
  const res = await fetch("http://localhost:8000/api/employee", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as EmployeeAPIResponse[];
}

export default async function EmployeeListPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const employees = await getEmployees().catch((err) => {
    console.error(err);
    return null;
  });

  if (!employees) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
          <h1 className="text-2xl font-bold">Employee Directory</h1>
          <div className="flex items-center gap-4">
            <Link href="/employee/add">
              <Button>
                <PlusIcon size={24} />
                Add Employee
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full gap-4">
          <div className="flex flex-row items-center justify-start gap-2 bg-red-200 rounded-lg p-4">
            <AlertCircleIcon size={24} className="text-red-700" />
            <p className="text-red-900">
              An error occurred while fetching employees.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <div className="flex items-center gap-4">
          <Search placeholder="Search Employees" />
          <Link href="/employee/add">
            <Button>
              <PlusIcon size={24} />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>
      <EmployeeGrid employees={employees} query={query} />
    </div>
  );
}
