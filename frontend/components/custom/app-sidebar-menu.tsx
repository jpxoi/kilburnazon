"use client";

import { Home, Landmark, Cake, FileClock, User, CalendarClock } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/employee/list",
    icon: User,
  },
  {
    title: "Leave Requests",
    url: "/leave-requests",
    icon: CalendarClock,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: Landmark,
  },
  {
    title: "Birthdays",
    url: "/birthdays",
    icon: Cake,
  },
  {
    title: "Termination Logs",
    url: "/termination/logs",
    icon: FileClock,
  },
];

export default function AppSidebarMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
