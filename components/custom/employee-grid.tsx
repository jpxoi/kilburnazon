"use client";

import { EmployeeAPIResponse } from "@/interfaces";
import { useEffect, useState } from "react";
import EmployeeCard from "@/components/custom/employee-card";

export default function EmployeeGrid({
  employees,
  query,
}: {
  employees: EmployeeAPIResponse[];
  query?: string;
}) {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowerCaseQuery) ||
        employee.id.toString().includes(lowerCaseQuery) ||
        employee.nin.toLowerCase().includes(lowerCaseQuery) ||
        employee.EmployeeJob.job_role.Department.name
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        employee.EmployeeJob.job_role.title
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        employee.EmployeeContact.email.toLowerCase().includes(lowerCaseQuery) ||
        employee.hired_date.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    if (!query) {
      setFilteredEmployees(employees);
      return;
    }

    handleSearch(query);
  }, [query]);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      ) : (
        <div className="col-span-full">
          <p className="text-center text-gray-500">
            No employees found for the search term "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
