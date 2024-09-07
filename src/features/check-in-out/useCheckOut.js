import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: ( bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} Checked out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("error occured while checking out");
    },
  });

  return { checkOut, isCheckingOut };
}

export default useCheckOut;
