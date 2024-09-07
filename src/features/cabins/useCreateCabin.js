import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
  });
  return { createCabin, isCreatingCabin };
}
