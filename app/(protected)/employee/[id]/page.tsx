import EmployeeCard from "@/components/custom/employee-card";
import EmployeeEditTrigger from "@/components/custom/employee-edit-trigger";
import EmployeeOptions from "@/components/custom/employee-options";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmployeeAPIResponse } from "@/interfaces";
import { ChevronLeft, PenIcon } from "lucide-react";
import Link from "next/link";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await fetch(`http://localhost:8000/api/employee/${id}`);
  const employee = (await data.json()) as EmployeeAPIResponse;

  const formattedSalary = employee.EmployeeJob.salary
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(employee.EmployeeJob.salary)
    : null;

  const formattedHiredDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(employee.hired_date));

  const formattedBirthday = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(employee.date_of_birth));

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center justify-center gap-2">
          <Link href="/employee/list">
            <Button
              variant="outline"
              size="xs"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">
            Employee <span className="text-gray-500">#{employee.id}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <EmployeeEditTrigger employee={employee} variant="default" />
          <EmployeeOptions id={employee.id} variant="default" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
        <EmployeeCard employee={employee} optionsBar={false} />
        <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4">
          <h2 className="text-lg font-bold">Employee Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div>
              <h3 className="text-md font-bold">Personal Information</h3>
              <div className="grid xl:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-md">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    National Insurance Number
                  </p>
                  <p className="text-md">{employee.nin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-md">{formattedBirthday}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="text-md">{employee.id}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-bold">Contact Information</h3>
              <div className="grid xl:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-md truncate">
                    {employee.EmployeeContact.email}{" "}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Home Address</p>
                  <p className="text-md">
                    {employee.EmployeeContact.home_address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="text-md">
                    {employee.EmployeeContact.emergency_name || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Emergency Contact Relationship
                  </p>
                  <p className="text-md">
                    {employee.EmployeeContact.emergency_relationship || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Emergency Contact Number
                  </p>
                  <p className="text-md">
                    {employee.EmployeeContact.emergency_phone || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-bold">Job Information</h3>
              <div className="grid xl:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Job Role</p>
                  <p className="text-md">
                    {employee.EmployeeJob.job_role.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-md">
                    {employee.EmployeeJob.job_role.Department.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hired Date</p>
                  <p className="text-md">{formattedHiredDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contract Type</p>
                  <Badge>{employee.EmployeeJob.contract as string}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="text-md">
                    {formattedSalary || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
