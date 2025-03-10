import { FilterStudents } from "../components/filterStudents";
import { StudentTable } from "@/apps/student/components/studentTable";
import { useFetchStudents } from "@/hooks/useStudents";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { createQueryString } from "@/utils/createQueryString";

const Students = () => {
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
      <FilterStudents />
      <StudentTable user={students} />
      <Pagination meta={students.meta} />
    </div>
  );
};

export default Students;
