import HeroBanner from "@/components/custom/hero-banner";
import { Button } from "@/components/ui/button";
import {
  Calendar1Icon,
  LifeBuoyIcon,
  NewspaperIcon,
  ScrollTextIcon,
  UserRoundPenIcon,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start p-8 pt-4 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Kilburnazon Intranet</h1>
        <Link href="/dashboard">
          <Button variant="link">Admin Dashboard</Button>
        </Link>
      </div>
      <HeroBanner />
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className="text-xl font-bold">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Link href="/request-leave">
            <Button size="lg" variant="default" className="w-full">
              <UserRoundPenIcon size={24} />
              Request Leave
            </Button>
          </Link>
          <Button disabled size="lg" variant="default" className="w-full">
            <LifeBuoyIcon size={24} />
            <span>IT Helpdesk</span>
          </Button>
          <Button disabled size="lg" variant="default" className="w-full">
            <Calendar1Icon size={24} />
            <span>Company Calendar</span>
          </Button>
          <Button disabled size="lg" variant="default" className="w-full">
            <ScrollTextIcon size={24} />
            <span>Company Policies</span>
          </Button>
          <Button disabled size="lg" variant="default" className="w-full">
            <NewspaperIcon size={24} />
            <span>Company News</span>
          </Button>
        </div>
      </div>
      <footer className="flex items-center justify-center w-full gap-2 mt-16">
        <p className="text-sm text-center">
          &copy; 2024 Kilburnazon. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
