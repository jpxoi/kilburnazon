"use client";

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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function EmployeeEditTrigger({
  employee,
  variant,
}: {
  employee: EmployeeAPIResponse;
  variant: "default" | "compact";
}) {
  const { toast } = useToast();
  const router = useRouter()

  const [name, setName] = useState(employee.name);
  const [avatar_url, setAvatarUrl] = useState(employee.avatar_url);
  const [email, setEmail] = useState(employee.EmployeeContact.email);
  const [address, setAddress] = useState(employee.EmployeeContact.home_address);
  const [emergency_name, setEmergencyName] = useState(
    employee.EmployeeContact.emergency_name
  );
  const [emergency_relation, setEmergencyRelation] = useState(
    employee.EmployeeContact.emergency_relationship
  );
  const [emergency_phone, setEmergencyPhone] = useState(
    employee.EmployeeContact.emergency_phone
  );

  const submitChanges = async () => {
    console.log(email);
    await fetch(`http://localhost:8000/api/employee/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar_url,
        employee_contact: {
          email: email,
          home_address: address,
          emergency_name,
          emergency_relationship: emergency_relation,
          emergency_phone,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          throw new Error("Failed to update employee");
        }

        if (data.errors) {
          throw new Error(data.message);
        }

        toast({
          variant: "success",
          title: "Employee updated",
          description: "The employee details have been updated successfully.",
        });

        router.refresh()
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err.message,
          action: (
            <ToastAction altText="Try again" onClick={() => submitChanges()}>
              Try again
            </ToastAction>
          ),
        });
      });
  };
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={employee.name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar_url" className="text-right">
              Avatar URL
            </Label>
            <Input
              id="avatar_url"
              defaultValue={employee.avatar_url}
              className="col-span-3"
              onChange={(e) => setAvatarUrl(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emergency_name" className="text-right">
              Emergency Contact
            </Label>
            <Input
              id="emergency_name"
              defaultValue={employee.EmployeeContact.emergency_name}
              className="col-span-3"
              onChange={(e) => setEmergencyName(e.target.value)}
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
              onChange={(e) => setEmergencyRelation(e.target.value)}
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
              onChange={(e) => setEmergencyPhone(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={(e) => submitChanges()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
