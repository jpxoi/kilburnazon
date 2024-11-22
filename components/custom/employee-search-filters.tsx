import {
  fetchDepartments,
  fetchJobRoles,
  fetchLocations,
} from "@/lib/fetchers";
import DepartmentFilter from "../filters/department-filter";
import JobRoleFilter from "../filters/job-role-filter";
import LocationFilter from "../filters/location-filter";
import Search from "./search";

export default async function EmployeeSearchFilters() {
  const departments = await fetchDepartments().catch((err) => {
    console.error(err);
    return null;
  });
  const jobRoles = await fetchJobRoles().catch((err) => {
    console.error(err);
    return null;
  });

  const locations = await fetchLocations().catch((err) => {
    console.error(err);
    return null;
  });

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start gap-4">
      <div className="flex items-center gap-4 min-w-80">
        <Search placeholder="Search Employees" />
      </div>
      <div className="flex flex-row items-start lg:items-center gap-2 flex-wrap">
        <DepartmentFilter departments={departments || []} />
        <JobRoleFilter jobRoles={jobRoles || []} />
        <LocationFilter locations={locations || []} />
      </div>
    </div>
  );
}
