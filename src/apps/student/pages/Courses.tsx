import { fetchStudents } from "@/api/students/student-api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { StudentTable } from "@/apps/student/components/studentTable";
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterStudents } from "../components/filterStudents";
import { useStudents } from "@/hooks/useStudents";
import { useSearchParams } from "react-router-dom";

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Persisting search & pagination in URL
  const pageNumber = Number(searchParams.get("page")) || 0;
  const searchBy = searchParams.get("searchBy") || "firstName";
  const searchValue = searchParams.get("search") || "";

  const { data, isPending, error } = useQuery({
    queryKey: ["students", pageNumber],
    queryFn: () => fetchStudents({ key: 10, value: pageNumber }),
    placeholderData: keepPreviousData,
    staleTime:50000
  });

  const { data: filteredData } = useStudents({ searchBy, searchValue });

  if (isPending) return <div>Loading...</div>;
  if (error) return <p>Error occurred</p>;

  return (
    <div className="flex flex-col">
      <FilterStudents />
      <StudentTable user={filteredData || data} />

      <div className="flex items-center gap-5">
        <Button
          disabled={pageNumber <= 0}
          onClick={() => setSearchParams({ page: String(pageNumber - 10), searchBy, search: searchValue })}
        >
          PREV
        </Button>
        <span>{pageNumber / 10 + 1}</span>
        <Button
          onClick={() => setSearchParams({ page: String(pageNumber + 10), searchBy, search: searchValue })}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Courses;
