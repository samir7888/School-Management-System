import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
// Auth apps/pages
import Login from "./apps/Login-Page";

// Layout components
import AdminLayout from "./components/layouts/AdminLayout";
import StudentLayout from "./components/layouts/StudentLayout";
import TeacherLayout from "./components/layouts/TeacherLayout";
import AuthLayout from "./components/layouts/AuthLayout";

// Admin apps/pages
import AdminHome from "./apps/admin/pages/AdminHome";
import ManageUsers from "./apps/admin/pages/ManageUsers";
import Settings from "./apps/admin/pages/Settings";

// Student apps/pages
import Courses from "./apps/student/pages/Students";
import Grades from "./apps/student/pages/Grades";
import Profile from "./apps/student/pages/Profile";

// Teacher apps/pages
import Assignments from "./apps/teacher/pages/Assignments";
import Students from "./apps/teacher/pages/Students";
import Classes from "./apps/teacher/pages/Class";

// Super Admin apps/pages
import Overview from "./apps/super-admin/pages/Overview";
import ManageAdmins from "./apps/super-admin/pages/ManageAdmins";
import SystemSettings from "./apps/super-admin/pages/SystemSettings";
import Persist from "./utils/Persist";

import { ProtectedRoute } from "./utils/protectedRoute";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    const redirectPath = `/${currentUser.role}/dashboard`;
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export const routes = [
  {
    path: "/",
    element: (
       <AuthGuard>
        <AuthLayout />
       </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/super_admin",
    element: (
      <Persist>
         <ProtectedRoute allowedRoutes={["super_admin"]}>
          <SuperAdminLayout />
         </ProtectedRoute>
       </Persist>
    ),
    children: [
      {
        path: "/super_admin",
        element: <Navigate to="/super_admin/dashboard" />,
      },
      { path: "/super_admin/dashboard", element: <Overview /> },
      { path: "/super_admin/manage-admins", element: <ManageAdmins /> },
      { path: "/super_admin/system-settings", element: <SystemSettings /> },
      { path: "/super_admin/student", element: <Courses /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoutes={["admin", "super_admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin", element: <Navigate to="/admin/dashboard" /> },
      { path: "/admin/dashboard", element: <AdminHome /> },
      { path: "/admin/manage-users", element: <ManageUsers /> },
      { path: "/admin/settings", element: <Settings /> },
    ],
  },
  {
    path: "/teacher",
    element: (
      <Persist>
        <ProtectedRoute allowedRoutes={["teacher"]}>
          <TeacherLayout />
        </ProtectedRoute>
      </Persist>
    ),
    children: [
      { path: "/teacher", element: <Navigate to="/teacher/dashboard" /> },
      { path: "/teacher/dashboard", element: <Assignments /> },
      { path: "/teacher/students", element: <Students /> },
      { path: "/teacher/classes", element: <Classes /> },
    ],
  },
  {
    path: "/student",
    element: (
      <Persist>
        <ProtectedRoute allowedRoutes={["student,super_admin"]}>
          <StudentLayout />
        </ProtectedRoute>
      </Persist>
    ),
    children: [
      { path: "/student", element: <Navigate to="/student/dashboard" /> },
      { path: "/student/dashboard", element: <Courses /> },
      { path: "/student/grades", element: <Grades /> },
      { path: "/student/profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex h-screen items-center justify-center">
        Page not found
      </div>
    ),
  },
];
