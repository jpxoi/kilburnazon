import EmployeeSearchFilters from "@/components/custom/employee-search-filters";
import EmployeeGrid from "@/components/custom/employee-grid";
import NewEmployeeModal from "@/components/custom/new-employee-modal";
import { AlertCircleIcon } from "lucide-react";
import { fetchEmployees } from "@/lib/fetchers";

export default async function EmployeeListPage(props: {
  searchParams?: Promise<{
    query?: string;
    department?: string;
    jobRole?: string;
    location?: string;
  }>;
}) {
  const employees = await fetchEmployees().catch((err) => {
    console.error(err);
    return null;
  });

  if (!employees) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
        <div className="flex items-center justify-between w-full gap-2">
          <h1 className="text-2xl font-bold">Employee Directory</h1>
          <NewEmployeeModal />
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

  const filters = {
    department: searchParams?.department || "",
    jobRole: searchParams?.jobRole || "",
    location: searchParams?.location || "",
  };

  const filteredEmployees = employees.filter((employee) => {
    if (
      filters.department !== "" &&
      String(employee.employee_job.job_role.department_id) !==
        filters.department
    ) {
      return false;
    }
    if (
      filters.jobRole !== "" &&
      String(employee.employee_job.job_role_id) !== filters.jobRole
    ) {
      return false;
    }
    if (
      filters.location !== "" &&
      String(employee.employee_job.location_id) !== filters.location
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col items-start justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <NewEmployeeModal />
      </div>
      <EmployeeSearchFilters />
      <EmployeeGrid employees={filteredEmployees} query={query} />
    </div>
  );
}
