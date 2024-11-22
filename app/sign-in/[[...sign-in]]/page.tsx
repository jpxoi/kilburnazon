import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Building } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-2 h-dvh">
      <div className="hidden lg:flex flex-col items-center justify-start bg-neutral-900 p-8">
        <div className="flex items-center text-slate-50 justify-start w-full gap-2">
          <Building size={24} />
          <h1 className="text-2xl font-bold">Kilburnazon</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between p-8">
        <div className="flex flex-col items-end gap-4 w-full">
          <Link href="/">
            <Button variant="link">Back to Home</Button>
          </Link>
        </div>

        <ClerkLoading>
            <div className="flex items-center justify-center gap-2">
                <Loader />
            </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-sm text-slate-500">
            Please sign in to continue to Kilburnazon.
          </p>
        </div>
      </div>
    </div>
  );
}
