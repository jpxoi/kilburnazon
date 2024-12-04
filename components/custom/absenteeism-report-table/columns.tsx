/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Badge } from "@/components/ui/badge";
import { AbsenteeismReportModel } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AbsenteeismReportModel>[] = [
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => <Badge>{row.original.period}</Badge>,
  },
  {
    accessorKey: "department_name",
    header: "Department",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.department_name}</Badge>
    ),
  },
  {
    accessorKey: "leave_reason",
    header: "Leave Reason",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.leave_reason}</Badge>
    ),
  },
  {
    accessorKey: "total_requests",
    header: "Total Leave Requests",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-GB").format(row.original.total_requests),
  },
  {
    accessorKey: "total_absent_days",
    header: "Total Absent Days",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-GB").format(row.original.total_absent_days),
  },
  {
    accessorKey: "avg_absent_days",
    header: "Average Absent Days",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-GB").format(row.original.avg_absent_days),
  },
  {
    accessorKey: "absence_rate",
    header: "Attendance Rate",
    cell: ({ row }) => {
      const attendanceRate = (100 - row.original.absence_rate) / 100;
      const baseColor =
        attendanceRate > 0.9
          ? "bg-emerald-600"
          : attendanceRate > 0.75
          ? "bg-orange-500"
          : "bg-red-500";
      const hoverColor =
        attendanceRate > 0.9
          ? "hover:bg-emerald-700"
          : attendanceRate > 0.75
          ? "hover:bg-orange-600"
          : "hover:bg-red-600";
      return (
        <Badge className={`${baseColor} ${hoverColor}`}>
          {new Intl.NumberFormat("en-GB", {
            style: "percent",
            minimumFractionDigits: 2,
          }).format(attendanceRate)}
        </Badge>
      );
    },
  },
];
