import { PenIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EmployeeAPIResponse } from "@/interfaces";
import { Separator } from "../ui/separator";

export default function EmployeeEditTrigger({
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Make changes to the employee's details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={employee.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nin" className="text-right">
              NIN
            </Label>
            <Input
              id="nin"
              defaultValue={employee.nin}
              className="col-span-3"
              readOnly
              disabled
            />
          </div>
          <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={employee.EmployeeContact.email}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
                Address
            </Label>
            <Input
              id="address"
              defaultValue={employee.EmployeeContact.home_address}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergency_name" className="text-right">
              Emergency Contact
            </Label>
            <Input
              id="emergency_name"
              defaultValue={employee.EmployeeContact.emergency_name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergency_relation" className="text-right">
              Emergency Relationship
            </Label>
            <Input
              id="emergency_relation"
              defaultValue={employee.EmployeeContact.emergency_relationship}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergency_phone" className="text-right">
              Emergency Phone
            </Label>
            <Input
              id="emergency_phone"
              defaultValue={employee.EmployeeContact.emergency_phone}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
