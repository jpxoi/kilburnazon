import { PenBoxIcon, PenIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { EmployeeAPIResponse } from "@/interfaces";
import EditEmployeeForm from "./edit-employee-form";

export default function EditEmployeeModal({
  employee,
  variant,
}: {
  employee: EmployeeAPIResponse;
  variant: "default" | "compact";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "default" ? (
          <Button variant="default" size="sm">
            <PenIcon size={16} />
            <span className="hidden md:inline">Edit</span>
          </Button>
        ) : (
          <Button variant="secondary" size="xs">
            <PenIcon size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <PenBoxIcon size={20} />
              <h2 className="text-xl font-bold">Edit Employee</h2>
            </div>
          </DialogTitle>
          <DialogDescription>
            Make changes to the employee&apos;s details.
          </DialogDescription>
        </DialogHeader>
        <EditEmployeeForm employee={employee} />
      </DialogContent>
    </Dialog>
  );
}
