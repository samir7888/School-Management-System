import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAuth";
import { BASEURL } from "@/utils/constant";
import { CreateTeacherInput } from "@/schemas/teacherSchema";

export const useTeacherMutation = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosAuth();

  return useMutation({
    mutationFn: async (
      teacherData: CreateTeacherInput
    ): Promise<CreateTeacherInput & { branchId: string }> => {
      const response = await axiosInstance.post(
        `${BASEURL}/teachers`,
        teacherData
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
