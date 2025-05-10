"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminationLogAPIResponse } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<TerminationLogAPIResponse>[] = [
  {
    accessorKey: "id",
    header: "Log ID",
    cell: ({ row }) => <Badge>{row.original.id}</Badge>,
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log(`Deleting Entry ${row.original.id}`)}>
              <TrashIcon className="h-4 w-4" />
              <span>Delete Inmediatly</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
