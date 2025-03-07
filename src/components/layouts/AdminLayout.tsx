import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AdminSidebar } from "@/apps/admin/components/AdminSiderbar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Sidebar Section */}
        <aside className="">
          <SidebarTrigger />
          <AdminSidebar />
        </aside>

        {/* Main Content Section */}
        <main className="w-full bg-red-100 p-10">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
