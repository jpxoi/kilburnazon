"use client";

import { ArrowBigUpDashIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { promoteEmployee, terminateEmployee } from "@/actions/employee";

export default function EmployeeOptions({
  id,
  variant,
}: {
  id: number;
  variant: "default" | "compact";
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [percentage, setPercentage] = useState(5.0);
  const [isPending, startTransition] = useTransition();

  const promote = (id: number, percentage: number) => {
    const formattedPercentage = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
    }).format(percentage / 100);

    startTransition(() => {
      promoteEmployee(id.toString(), { percentage })
        .then((data) => {
          if (!data) {
            throw new Error("There was an error promoting the employee.");
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.success) {
            toast({
              variant: "success",
              title: `Promoted employee ${id}`,
              description: `Employee has been promoted successfully and their salary has been increased by ${formattedPercentage}.`,
            });
            router.refresh();
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Failed to promote employee",
            description: err.message,
          });
        });
    });
  };

  const terminate = (id: number) => {
    startTransition(() => {
      terminateEmployee(id.toString(), "jpxoi@icloud.com")
        .then((data) => {
          if (!data) {
            throw new Error("There was an error terminating the employee.");
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.success) {
            toast({
              variant: "success",
              title: `Terminated employee ${id}`,
              description: `Employee has been terminated successfully.`,
            });
            router.refresh();
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Failed to terminate employee",
            description: err.message,
          });
        });
    });
  };

  return (
    <div
      className={`flex items-center ${
        variant === "default" ? "gap-2" : "gap-1"
      }`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {variant === "default" ? (
            <Button variant="positive" size="sm">
              <ArrowBigUpDashIcon size={16} />
              <span className="hidden md:inline">Promote</span>
            </Button>
          ) : (
            <Button variant="positive" size="xs">
              <ArrowBigUpDashIcon size={16} />
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will promote the employee and increase their salary by{" "}
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
              }).format(percentage / 100) || "5.00%"}
              . You cannot undo this action unless you manually adjust the
              salary back to its original value in the employee&apos;s profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex items-center gap-2">
              <Label htmlFor="percentage">Increase by (%)</Label>
              <Input
                id="percentage"
                type="number"
                min={1}
                max={100}
                defaultValue={percentage}
                onChange={(e) =>
                  setPercentage(
                    parseFloat(parseFloat(e.target.value).toFixed(2)) || 5
                  )
                }
                className="w-20 p-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => promote(id, percentage)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {variant === "default" ? (
            <Button variant="destructive" size="sm">
              <TrashIcon size={16} />
              <span className="hidden md:inline">Terminate</span>
            </Button>
          ) : (
            <Button variant="destructive" size="xs">
              <TrashIcon size={16} />
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will terminate the employee&apos;s contract and remove
              them from the system. You cannot undo this action unless you
              manually re-add the employee to the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => terminate(id)}
            >
              Terminate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
