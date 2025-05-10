import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default async function RequestLeavePage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-2 w-full h-screen bg-emerald-400">
      <Card className="max-w-md">
        <CardHeader>
          <h2 className="text-xl text-center font-bold">
            Leave Request Submitted
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <p className="text-center">
              Your leave request has been submitted successfully. You will be
              notified once it has been approved.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <Link href="/">
                <Button variant="link" className="text-blue-600">
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
