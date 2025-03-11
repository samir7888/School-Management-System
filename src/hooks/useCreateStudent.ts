import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStudent } from "../types/student-types";
import useAxiosAuth from "@/hooks/useAuth";
import { BASEURL } from "@/utils/constant";

export const useStudentMutation = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosAuth();

  return useMutation({
    mutationFn: async (studentData: Omit<IStudent, "id">): Promise<IStudent> => {
      const response = await axiosInstance.post(
        `${BASEURL}/api/student`,
        studentData
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
