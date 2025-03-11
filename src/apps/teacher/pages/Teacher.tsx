

import Pagination from "@/components/forms-fileds/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createQueryString } from "@/utils/createQueryString";
import { Button } from "@/components/ui/button";
import { useFetchTeachers } from "@/hooks/useFetchTeachers";
import { FilterTeachers } from "../components/filterTeachers";
import { TeacherTable } from "../components/teacherTabel";

const Teachers = () => {
const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const {
    data: teachers,
    isPending,
    error,
  } = useFetchTeachers({
    query: createQueryString({
      search: searchParams.get("search"),
      page: searchParams.get("page"),
      take: searchParams.get("take"),
    }),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <p>Error occurred</p>;
  if (teachers.data.length < 1) return <p>No user found</p>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <FilterTeachers />
        <Button onClick={() => navigate('/super_admin/create-teacher')}
         >Create a Teacher</Button>
      </div>
      
      <TeacherTable user={teachers} />
      <Pagination meta={teachers.meta} />
    </div>
  );
};

export default Teachers;
