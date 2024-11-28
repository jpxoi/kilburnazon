"use client"

import { TerminationLogAPIResponse } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<TerminationLogAPIResponse>[] = [
  {
    accessorKey: "id",
    header: "Log ID",
  },
  {
    accessorKey: "employee.name",
    header: "Employee",
  },
  {
    accessorKey: "termination_reason",
    header: "Termination Reason",
  },
  {
    accessorKey: "terminated_by",
    header: "Terminated By",
  },
  {
    accessorKey: "job_role.title",
    header: "Last Job Role",
  },
  {
    accessorKey: "last_salary",
    header: "Last Salary",
  },
  {
    accessorKey: "termination_timestamp",
    header: "Termination Date",
  },
  {
    accessorKey: "retention_timestamp",
    header: "Scheduled Delete Date",
  }
]
