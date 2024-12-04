import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PayrollSummaryCardsSkeleton() {
  return (
    <div className="flex items-center justify-start w-full h-full gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            <Skeleton className="w-1/3 h-5" />
          </CardDescription>
          <CardTitle>
            <Skeleton className="w-1/2 h-6" />
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            <Skeleton className="w-1/3 h-5" />
          </CardDescription>
          <CardTitle>
            <Skeleton className="w-1/2 h-6" />
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            <Skeleton className="w-1/3 h-5" />
          </CardDescription>
          <CardTitle>
            <Skeleton className="w-1/2 h-6" />
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>
            <Skeleton className="w-1/3 h-5" />
          </CardDescription>
          <CardTitle>
            <Skeleton className="w-1/2 h-6" />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
