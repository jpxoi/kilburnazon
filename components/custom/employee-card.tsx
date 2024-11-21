import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { EmployeeAPIResponse } from "@/interfaces";
import EmployeeOptions from "./employee-options";
import EmployeeEditTrigger from "./employee-edit-trigger";

export default function EmployeeCard({
  employee,
  optionsBar = true,
}: {
  employee: EmployeeAPIResponse;
  optionsBar?: boolean;
}) {
  const initials = employee.name
    ? employee.name.split(" ").length > 1
      ? employee.name.split(" ")[0][0] +
        employee.name.split(" ").slice(-1)[0][0]
      : employee.name[0]
    : "";

  const avatarUrl =
    employee.avatar_url ||
    `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
      employee.name.split(" ")[0]
    }`;

  return (
    <Card className="items-center max-h-fit">
      <Link href={`/employee/${employee.id}`}>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Badge variant="secondary" className="self-start">
              {employee.id}
            </Badge>
            <Badge variant="outline">{employee.nin}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-center justify-center">
          <CardTitle className="text-xl">{employee.name}</CardTitle>
          <CardDescription className="text-nowrap truncate max-w-full">
            <span className="text-gray-500">
              {employee.EmployeeJob.job_role.title}
            </span>
            <span className="text-gray-500"> • </span>
            <span className="text-gray-500">
              {employee.EmployeeJob.job_role.Department.name}
            </span>
          </CardDescription>
          <Avatar className="size-16">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray-500">Joined {employee.hired_date}</p>
          <Badge variant="secondary" className="max-w-full">
            <span className="text-nowrap truncate">
              {employee.EmployeeContact.email}
            </span>
          </Badge>
        </CardContent>
      </Link>
      {optionsBar && (
        <CardFooter className="flex items-center justify-between">
          <EmployeeEditTrigger employee={employee} variant="compact" />
          <EmployeeOptions id={employee.id} variant="compact" />
        </CardFooter>
      )}
    </Card>
  );
}
