"use client";

import { NewLeaveRequestFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { LeaveTypeModel } from "@/interfaces";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createLeaveRequest } from "@/actions/leave-requests";

const today = new Date();
today.setHours(0, 0, 0, 0);
const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(today.getFullYear() + 1);

export default function NewLeaveRequestForm({
  leaveTypes,
}: {
  leaveTypes: LeaveTypeModel[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof NewLeaveRequestFormSchema>>({
    resolver: zodResolver(NewLeaveRequestFormSchema),
    defaultValues: {
      employee_id: undefined,
      leave_type_id: undefined,
      start_date: undefined,
      end_date: undefined,
      status: "PENDING",
      comments: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof NewLeaveRequestFormSchema>) {
    console.log(values);
    startTransition(() => {
        createLeaveRequest(values)
        .then((data) => {
          if (!data) {
            throw new Error("There was an error creating the leave request");
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.success) {
            console.log("Leave request created successfully");
            toast({
              variant: "success",
              title: `Leave Request Created`,
              description: "The leave request has been created successfully.",
            });

            router.refresh();
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            variant: "destructive",
            title: "Failed to create leave request",
            description: err.message,
          });
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 flex-col max-w-96 w-full"
      >
        <div className="space-y-4 w-72 sm:w-80">
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID*</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-72 sm:w-80 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a start date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          return date < today || date > oneYearFromNow;
                        }}
                        fromMonth={new Date()}
                        toDate={oneYearFromNow}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-72 sm:w-80 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick an end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          return (
                            date < form.getValues("start_date") ||
                            date < today ||
                            date > oneYearFromNow
                          );
                        }}
                        fromMonth={new Date()}
                        toDate={oneYearFromNow}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leave_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leaveTypes && leaveTypes.length > 0 ? (
                        leaveTypes.map((leaveType) => (
                          <SelectItem
                            key={String(leaveType.id)}
                            value={String(leaveType.id)}
                          >
                            {leaveType.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          No leave types available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contract type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem disabled value="APPROVED">
                        Approved
                      </SelectItem>
                      <SelectItem disabled value="REJECTED">
                        Rejected
                      </SelectItem>
                      <SelectItem disabled value="CANCELLED">
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional comments here"
                      className="resize-y h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        <div className="flex justify-end">
          <Button disabled={isPending} className="self-end" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
