import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { SuperAdminSidebar } from "@/apps/super-admin/components/SuperAdminSiderbar";

const SuperAdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Sidebar Section */}
        <aside className="">
          <SidebarTrigger />
          <SuperAdminSidebar />
        </aside>

        {/* Main Content Section */}
        <main className="w-full bg-[#F8FAFC] text-[#1E293B] p-10">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;
