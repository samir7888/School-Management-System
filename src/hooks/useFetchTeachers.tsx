import { BASEURL } from "@/utils/constant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAuth";

export const useFetchTeachers = ({ query }: { query: string }) => {
  const axiosInstance = useAxiosAuth();
  return useQuery({
    queryKey: ["teachers", query],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `${BASEURL}/teachers${query ? `?${query}` : ""}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching teachers:", error);
        throw new Error("Failed to fetch teachers");
      }
    },
    placeholderData: keepPreviousData,
  });
};
