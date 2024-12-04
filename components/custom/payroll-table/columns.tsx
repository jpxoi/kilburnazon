"use client";

import { Badge } from "@/components/ui/badge";
import { PayrollEntryModel } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export const columns: ColumnDef<PayrollEntryModel>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <Badge>{row.original.id}</Badge>,
  },
  {
    accessorKey: "employee.name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original.employee;
      const initials = employee.name
        ? employee.name.split(" ").length > 1
          ? employee.name.split(" ")[0][0] +
            employee.name.split(" ").slice(-1)[0][0]
          : employee.name[0]
        : "";

      const avatarUrl =
        employee.avatar_url ||
        `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
          employee.name.split(" ")[0]
        }`;

      return (
        <Link
          href={`/employee/${employee.id}`}
          className="flex items-center gap-2"
        >
          <Avatar className="size-6">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{employee.name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "employee.employee_job.job_role.department.name",
    header: "Department",
    cell: ({ row }) => (
      <Badge variant="secondary">
        <span className="truncate max-w-20">
          {row.original.employee.employee_job.job_role.department.name}
        </span>
      </Badge>
    ),
  },
  {
    accessorKey: "employee.employee_job.job_role.title",
    header: "Job Title",
    cell: ({ row }) => (
      <Badge variant="outline">
        <span className="truncate max-w-28">
          {row.original.employee.employee_job.job_role.title}
        </span>
      </Badge>
    ),
  },
  {
    accessorKey: "base_salary",
    header: "Base Salary",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.base_salary);

      return (
        <span className={row.original.base_salary == 0 ? "text-gray-500" : ""}>
          {formatted === "£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "bonus",
    header: "Bonus",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.bonus);

      return (
        <span
          className={
            row.original.bonus > 0 ? "text-emerald-700" : "text-gray-500"
          }
        >
          {formatted === "£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "tax_deduction",
    header: "Tax",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.tax_deduction * -1);

      return (
        <span
          className={
            row.original.tax_deduction > 0 ? "text-red-700" : "text-gray-500"
          }
        >
          {formatted === "-£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "insurance_deduction",
    header: "Insurance",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.insurance_deduction * -1);

      return (
        <span
          className={
            row.original.insurance_deduction > 0
              ? "text-red-700"
              : "text-gray-500"
          }
        >
          {formatted === "-£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "retirement_contribution",
    header: "Retirement",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.retirement_contribution * -1);

      return (
        <span
          className={
            row.original.retirement_contribution > 0
              ? "text-red-700"
              : "text-gray-500"
          }
        >
          {formatted === "-£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "net_pay",
    header: "Net Pay",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.net_pay);

      return (
        <span className={row.original.net_pay == 0 ? "text-gray-500" : ""}>
          {formatted === "£0.00" ? "-" : formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "payroll_period.start_date",
    header: "Payroll Period",
    cell: ({ row }) => {
      const startDate = row.original.payroll_period?.start_date;
      return startDate
        ? new Date(startDate).toLocaleString("en-GB", {
            month: "short",
            year: "numeric",
          })
        : "Unknown";
    },
  },
  {
    accessorKey: "payroll_period.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.payroll_period?.status || "UNKNOWN";

      switch (status) {
        case "DRAFT":
          return <Badge className="bg-blue-600 hover:bg-blue-700">Draft</Badge>;
        case "PROCESSING":
          return (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">
              Processing
            </Badge>
          );
        case "COMPLETED":
          return (
            <Badge className="bg-emerald-600 hover:bg-emerald-700">
              Completed
            </Badge>
          );
        case "CANCELLED":
          return (
            <Badge className="bg-red-600 hover:bg-red-700">Cancelled</Badge>
          );
        default:
          return (
            <Badge className="bg-gray-600 hover:bg-gray-700">Unknown</Badge>
          );
      }
    },
  },
];
