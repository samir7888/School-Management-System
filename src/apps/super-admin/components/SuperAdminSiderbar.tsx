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
import { Link, useLocation } from "react-router-dom";

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
    title: "Teachers",
    url: "/super_admin/teacher",
    icon: Settings,
  },
  {
    title: "Students",
    url: "/super_admin/student",
    icon: Settings,
  },
 

];

export function SuperAdminSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent className="bg-[#1E1E2E] text-white">
        <SidebarMenu className="gap-5 p-4 ">
          {items.map((item) => {
const isActive = location.pathname === item.url;
            return <SidebarMenuItem className={`font-bold ${isActive ? 'text-blue-500' : 'text-white'}`}  key={item.title}>
              <SidebarMenuButton className={`${isActive ? 'bg-gray-700' : ''}`}  asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span className="text-xl">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          })}
        </SidebarMenu>
        <SidebarFooter>
            <Logout/>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
