import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteCabin as deleteCabinApi} from '../../services/apiCabins';


export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({

    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}

