import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import Logout from "@/components/Logout";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Manage Admins",
    url: "/super_admin/manage-admins",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/super_admin/system-settings",
    icon: Settings,
  },
  {
    title: "Students",
    url: "/super_admin/student",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "/super_admin/system-settings",
    icon: Settings,
  },
];

export function SuperAdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu className="gap-5 p-4">
          {items.map((item) => (
            <SidebarMenuItem className="font-bold"  key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span className="text-xl">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter>
            <Logout/>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
