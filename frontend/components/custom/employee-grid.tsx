"use client";

import { EmployeeAPIResponse } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "@/components/custom/employee-card";

export default function EmployeeGrid({
  employees,
  query,
}: {
  employees: EmployeeAPIResponse[];
  query?: string;
}) {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleSearch = useCallback((query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowerCaseQuery) ||
        employee.id.toString().includes(lowerCaseQuery) ||
        employee.nin.toLowerCase().includes(lowerCaseQuery) ||
        employee.employee_job.job_role.department.name
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        employee.employee_job.job_role.title
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        employee.employee_contact.email
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        employee.hired_date.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmployees(filtered);
  }, [employees]);

  useEffect(() => {
    if (!query) {
      setFilteredEmployees(employees);
      return;
    }

    handleSearch(query);
  }, [query, employees, handleSearch]);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      ) : query ? (
        <p className="text-center text-gray-500 w-full col-span-full">
          No employees found for the search query &quot;{query}&quot;.
        </p>
      ) : (
        <p className="text-center text-gray-500 w-full col-span-full">
          There is no employee data to display.
        </p>
      )}
    </div>
  );
}
