import { filterStudents } from "@/api/students/student-api";
import { useQuery } from "@tanstack/react-query";

export const useStudents = ({ searchBy, searchValue }: { searchBy: string; searchValue: string }) => {
  return useQuery({
    queryKey: ["students", searchBy, searchValue],
    queryFn: () => filterStudents({ key: searchBy, value: searchValue }),
    enabled: searchValue.length > 1, // Avoid unnecessary requests
  });
};
