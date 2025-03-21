import { FilterStudents } from "../components/filterStudents";
import { StudentTable } from "@/apps/student/components/studentTable";
import { useFetchStudents } from "@/hooks/useFetchStudents";
import Pagination from "@/components/forms-fileds/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createQueryString } from "@/utils/createQueryString";
import { Button } from "@/components/ui/button";

const Students = () => {
const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const {
    data: students,
    isPending,
    error,
  } = useFetchStudents({
    query: createQueryString({
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      take: searchParams.get("take"),
    }),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <p>Error occurred</p>;
  if (students.data.length < 1) return <p>No user found</p>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <FilterStudents />
        <Button onClick={() => navigate('/super_admin/create-student')}
         >Create a student</Button>
      </div>
      <StudentTable user={students} />
      <Pagination meta={students.meta} />
    </div>
  );
};

export default Students;
