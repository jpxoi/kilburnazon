import NewLeaveRequestForm from "@/components/custom/new-leave-request-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchLeaveTypes } from "@/lib/fetchers";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function RequestLeavePage() {
  const leaveTypes = await fetchLeaveTypes();

  return (
    <div className="flex flex-col items-center justify-start p-8 gap-4 w-full">
      <Link href="/" className="w-full">
        <Button variant="outline">
          <ChevronLeft size={24} />
          <span>Back to Home</span>
        </Button>
      </Link>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <Card className="max-w-fit">
          <CardHeader>
            <h2 className="text-xl font-bold">New Leave Request</h2>
          </CardHeader>
          <CardContent>
            <NewLeaveRequestForm leaveTypes={leaveTypes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
