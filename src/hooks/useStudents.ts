import { BASEURL } from "@/utils/constant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAuth";

export const useFetchStudents = ({ query }: { query: string }) => {
  const axiosInstance = useAxiosAuth();
  console.log(query);
  return useQuery({
    queryKey: ["students", query],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `${BASEURL}/students${query ? `?${query}` : ""}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching students:", error);
        throw new Error("Failed to fetch students");
      }
    },
    placeholderData: keepPreviousData,
  });
};
