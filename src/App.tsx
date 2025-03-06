import { Admin } from "./apps/admin/Admin";
import { Teacher } from "./apps/teacher/Teacher";
import { Home } from "./apps/Home";
import { SuperAdmin } from "./apps/super-admin/SuperAdmin";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Student from "./apps/student/Student";
import { ProtectedRoute } from "./services/protectedRoute";
import { UserRole } from "./types/user";
import Persist from "./components/Persist";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path={`/${UserRole.Admin}`}
          element={
            <Persist>
              <ProtectedRoute
                children={<Admin />}
                allowedRoutes={["admin", "super_admin"]}
              />
            </Persist>
            
          }
        />
        <Route
          path={`/${UserRole.Teacher}`}
          element={
            <ProtectedRoute
              children={<Teacher />}
              allowedRoutes={["teacher", "super_admin"]}
            />
          }
        />
        <Route
          path={`/${UserRole.Student}`}
          element={
            <ProtectedRoute
              children={<Student />}
              allowedRoutes={["student", "super_admin"]}
            />
          }
        />
        <Route
          path={`/${UserRole.SuperAdmin}`}
          element={
            <Persist>
              <ProtectedRoute
                children={<SuperAdmin />}
                allowedRoutes={["super_admin"]}
              />
            </Persist>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
