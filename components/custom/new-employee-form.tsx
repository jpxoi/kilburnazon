"use client";

import { NewEmployeeFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { BriefcaseBusiness, CalendarIcon, Phone, User } from "lucide-react";
import { JobRoleModel, LocationModel } from "@/interfaces";
import { useTransition } from "react";
import { createEmployee } from "@/actions/employee";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const eighteenYearsAgo = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

export default function NewEmployeeForm({
  locations,
  jobRoles,
}: {
  locations: LocationModel[];
  jobRoles: JobRoleModel[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof NewEmployeeFormSchema>>({
    resolver: zodResolver(NewEmployeeFormSchema),
    defaultValues: {
      name: undefined,
      date_of_birth: undefined,
      hired_date: new Date(),
      nin: undefined,
      avatar_url: undefined,
      employee_job: {
        location_id: undefined,
        job_role_id: undefined,
        contract_type: "FULL_TIME",
        salary: undefined,
      },
      employee_contact: {
        email: undefined,
        home_address: undefined,
        emergency_name: undefined,
        emergency_relationship: undefined,
        emergency_phone: undefined,
      },
    },
  });

  function handleSubmit(values: z.infer<typeof NewEmployeeFormSchema>) {
    console.log(values);
    startTransition(() => {
      createEmployee(values)
        .then((data) => {
          if (!data) {
            throw new Error("There was an error creating the employee.");
          }

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.success) {
            console.log("Employee created successfully.");
            toast({
              variant: "success",
              title: `Employee created`,
              description: "Employee has been created successfully.",
            });

            router.refresh();
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            variant: "destructive",
            title: "Failed to create employee",
            description: err.message,
          });
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 flex-col w-full max-w-6xl"
      >
        <div className="grid xl:grid-cols-3 gap-8">
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
                  <FormLabel>Full Name*</FormLabel>
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
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
                        captionLayout="dropdown"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          return (
                            date > eighteenYearsAgo ||
                            date < new Date("1900-01-01")
                          );
                        }}
                        fromYear={1900}
                        toDate={eighteenYearsAgo}
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
                  <FormLabel>National Insurance Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="QQ123456A" {...field} />
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
                  <FormDescription>
                    If you don&apos;t provide an avatar URL, one will be
                    generated for you.
                  </FormDescription>
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
                  <FormLabel>Email*</FormLabel>
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

          <div className="space-y-4 max-w-60">
            <div className="flex items-center justify-start gap-2">
              <BriefcaseBusiness size={20} />
              <h3 className="text-lg font-bold">Job Information</h3>
            </div>
            {/* <FormField
              control={form.control}
              name="employee_job.job_role_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role*</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="employee_job.job_role_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobRoles && jobRoles.length > 0 ? (
                        jobRoles.map((jobRole) => (
                          <SelectItem
                            key={String(jobRole.id)}
                            value={String(jobRole.id)}
                          >
                            {jobRole.title}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          No job roles found
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
              name="employee_job.location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations && locations.length > 0 ? (
                        locations.map((location) => (
                          <SelectItem
                            key={String(location.id)}
                            value={String(location.id)}
                          >
                            {location.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          No locations found
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
              name="hired_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hired Date*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
              name="employee_job.contract_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contract type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full-time</SelectItem>
                      <SelectItem value="PART_TIME">Part-time</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      <SelectItem value="FREELANCE">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_job.salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="£50,000"
                      type="tel"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex col-span-full justify-end">
          <Button disabled={isPending} className="self-end" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
