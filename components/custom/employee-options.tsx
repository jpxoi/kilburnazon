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
import { toast, useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

export default function EmployeeOptions({
  id,
  variant,
}: {
  id: number;
  variant: "default" | "compact";
}) {
  const { toast } = useToast();

  const promote = (id: number) => {
    console.log(`Promoting employee ${id}`);
    toast({
      title: "Promoting employee...",
      description:
        "We are promoting the employee and increasing their salary by 5%.",
    });
    fetch(`http://localhost:8000/api/employee/${id}/promote`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to promote employee");
        }
        toast({
          variant: "success",
          title: "Employee promoted",
          description: "The employee has been promoted successfully.",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "We couldn't promote the employee. Please try again later.",
          action: (
            <ToastAction altText="Try again" onClick={() => promote(id)}>
              Try again
            </ToastAction>
          ),
        });
      });
  };

  const terminate = (id: number) => {
    toast({
      title: "Terminating employee...",
      description:
        "We are terminating the employee and removing them from the system.",
    });
  };

  return (
    <div className={`flex items-center ${variant === "default" ? "gap-2" : "gap-1"}`}>
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
              This action will promote the employee and increase their salary by
              5%. You cannot undo this action unless you manually adjust the
              salary back to its original value in the employee's profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => promote(id)}>
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
              This action will terminate the employee's contract and remove them
              from the system. You cannot undo this action unless you manually
              re-add the employee to the system.
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
