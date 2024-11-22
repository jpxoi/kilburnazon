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
import { fetchJobRoles, fetchLocations } from "@/lib/fetchers";

export default async function NewEmployeeModal() {
  const locations = await fetchLocations().catch((err) => {
    console.error(err);
    return null;
  });

  const jobRoles = await fetchJobRoles().catch((err) => {
    console.error(err);
    return null;
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={24} />
          <span className="hidden sm:inline">Add Employee</span>
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
