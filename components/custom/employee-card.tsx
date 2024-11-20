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
import { PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { EmployeeAPIResponse } from "@/interfaces";

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
          <CardDescription>
            {employee.EmployeeJob.job_role.title}
            <span className="text-gray-500"> • </span>
            {employee.EmployeeJob.job_role.Department.name}
          </CardDescription>
          <Avatar className="size-16">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray-500">Joined {employee.hired_date}</p>
          <Badge variant="secondary">{employee.EmployeeContact.email}</Badge>
        </CardContent>
      </Link>
      {optionsBar && (
        <CardFooter className="flex items-center justify-between">
          <Link href="#">
            <TrashIcon className="size-4 text-red-500" />
          </Link>
          <Link href={`/employee/${employee.id}/edit`}>
            <PenIcon className="size-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
