import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Settings Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
    }
  );

  return { updateSettings, isUpdatingSettings };
}
