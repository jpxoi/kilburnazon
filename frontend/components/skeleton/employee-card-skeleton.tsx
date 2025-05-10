import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "compact";
}) {
  return (
    <Card className="items-center max-h-fit">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-[72px] h-[22px] rounded-md flex" />
          <Skeleton className="w-24 h-[22px] rounded-md flex" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center justify-center">
        <CardTitle className="text-xl">
          <Skeleton className="w-32 h-7 rounded-md" />
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Skeleton className="w-16 h-5 rounded-md" />
          <span className="text-gray-500"> • </span>
          <Skeleton className="w-16 h-5 rounded-md" />
        </CardDescription>
        <Avatar className="size-16">
          <Skeleton className="size-16 rounded-full" />
        </Avatar>
        <Skeleton className="w-32 h-5 rounded-md" />
        <Skeleton className="w-full h-[22px] rounded-md" />
      </CardContent>
      {variant === "default" && (
        <CardFooter className="flex items-center justify-between">
          <Skeleton className="w-8 h-7 rounded-md" />
          <div className="flex items-center gap-1">
            <Skeleton className="w-8 h-7 rounded-md" />
            <Skeleton className="w-8 h-7 rounded-md" />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
