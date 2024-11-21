import { PlusCircle, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewEmployeeForm from "./new-employee-form";
import { JobRolesAPIResponse, LocationsAPIResponse } from "@/interfaces";

async function getLocations() {
  const res = await fetch("http://localhost:8000/api/location", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as LocationsAPIResponse[];
}

async function getJobRoles() {
  const res = await fetch("http://localhost:8000/api/job-role", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as JobRolesAPIResponse[];
}

export default async function NewEmployeeModal() {
  const locations = await getLocations().catch((err) => {
    console.error(err);
    return null;
  });

  const jobRoles = await getJobRoles().catch((err) => {
    console.error(err);
    return null;
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={24} />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <PlusCircle size={24} />
              <h2 className="text-xl font-bold">Add Employee</h2>
            </div>
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new employee.
          </DialogDescription>
        </DialogHeader>
        <NewEmployeeForm
          locations={locations || []}
          jobRoles={jobRoles || []}
        />
      </DialogContent>
    </Dialog>
  );
}
