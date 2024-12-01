"use client";

import {
  approveLeaveRequest,
  rejectLeaveRequest,
} from "@/actions/leave-requests";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeaveRequestAPIResponse } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<LeaveRequestAPIResponse>[] = [
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
    accessorKey: "leave_type.name",
    header: "Leave Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.leave_type.name}</Badge>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "total_days",
    header: "Total Days",
    cell: ({ row }) => <span>{row.original.total_days} days</span>,
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-blue-500">
              <span className="sr-only">View Comments</span>
              <MessageCircleIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Comments from {row.original.employee.name}
              </DialogTitle>
              <DialogDescription>{row.original.comments}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "PENDING":
          return (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
          );
        case "APPROVED":
          return (
            <Badge className="bg-emerald-600 hover:bg-emerald-600">
              Approved
            </Badge>
          );
        case "REJECTED":
          return (
            <Badge className="bg-red-600 hover:bg-red-600">Rejected</Badge>
          );
        case "CANCELLED":
          return (
            <Badge className="bg-gray-600 hover:bg-gray-600">Cancelled</Badge>
          );
        default:
          return null;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      const router = useRouter();

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-green-700"
            disabled={
              request.status === "APPROVED" || request.status === "REJECTED"
            }
            onClick={() =>
              approveLeaveRequest(String(request.id), {
                employee_id: request.employee.id,
                leave_type_id: request.leave_type.id,
                year: parseInt(request.start_date.split(" ")[2]),
                total_days: request.leave_type.max_days_per_year,
                used_days: parseInt(request.total_days.toString()),
                approved_by: 11123211,
              })
                .then((data) => {
                  if (data.success) {
                    request.status = "APPROVED";
                    router.refresh();
                  }

                  if (data.error) {
                    console.error(data.error);
                    throw new Error(data.error);
                  }
                })
                .catch((error) => {
                  alert(error.message);
                })
            }
          >
            <span className="sr-only">Approve</span>
            <CheckIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-red-700"
            disabled={
              request.status === "REJECTED" || request.status === "APPROVED"
            }
            onClick={() => {
              rejectLeaveRequest(String(request.id))
                .then((data) => {
                  if (data.success) {
                    request.status = "REJECTED";
                    router.refresh();
                  }

                  if (data.error) {
                    console.error(data.error);
                    throw new Error(data.error);
                  }
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            <span className="sr-only">Reject</span>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
