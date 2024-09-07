import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
  });
  return { editCabin, isEditingCabin };
}
