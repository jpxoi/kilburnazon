"use client";

import { EditEmployeeFormSchema } from "@/schemas";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Phone, User } from "lucide-react";
import { EmployeeAPIResponse } from "@/interfaces";
import { updateEmployee } from "@/actions/employee";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function EditEmployeeForm({
  employee,
}: {
  employee: EmployeeAPIResponse;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditEmployeeFormSchema>>({
    resolver: zodResolver(EditEmployeeFormSchema),
    defaultValues: {
      name: employee.name,
      date_of_birth: new Date(employee.date_of_birth),
      nin: employee.nin,
      avatar_url: employee.avatar_url || undefined,
      employee_contact: {
        email: employee.employee_contact.email,
        home_address: employee.employee_contact.home_address,
        emergency_name: employee.employee_contact.emergency_name || undefined,
        emergency_relationship:
          employee.employee_contact.emergency_relationship || undefined,
        emergency_phone: employee.employee_contact.emergency_phone || undefined,
      },
    },
  });

  function handleSubmit(values: z.infer<typeof EditEmployeeFormSchema>) {
    console.log(values);
    startTransition(() => {
      updateEmployee(String(employee.id), values).then((data) => {
        if (data.error) {
          console.error(data.error);
          toast({
            variant: "destructive",
            title: "Failed to update employee",
            description: data.error,
          });
          return;
        }

        if (data.success) {
          toast({
            variant: "success",
            title: `Updated employee ${employee.id}`,
            description: "Employee has been updated successfully.",
          });

          router.refresh();
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 flex-col w-full max-w-3xl"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4 max-w-60">
            <div className="flex items-center justify-start gap-2">
              <User size={20} />
              <h3 className="text-lg font-bold">Personal Information</h3>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col cursor-not-allowed">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        fromYear={1900}
                        toDate={new Date()}
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
              name="nin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National Insurance Number</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      disabled
                      placeholder="QQ123456A"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 max-w-60">
            <div className="flex items-center justify-start gap-2">
              <Phone size={20} />
              <h3 className="text-lg font-bold">Contact Information</h3>
            </div>
            <FormField
              control={form.control}
              name="employee_contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="John.Doe@kilburnazon.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_contact.home_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_contact.emergency_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_contact.emergency_relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="Spouse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_contact.emergency_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="07654321098" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex col-span-full justify-end">
          <Button disabled={isPending} className="self-end" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
