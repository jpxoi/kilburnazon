import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import AppSidebarMenu from "@/components/custom/app-sidebar-menu";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Kilburnazon Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center justify-end w-full h-16 p-4">
          <ClerkLoading>
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-32 h-5 rounded-md bg-gray-300" />
              <Skeleton className="w-7 h-7 rounded-full bg-gray-300" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton showName />
          </ClerkLoaded>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
