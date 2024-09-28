import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} successfully checked out`);

      queryClient.invalidateQueries({
        queryKey: ["booking"],
        // active:true,//also do it like this
      });
    },
    onError: () => toast.error("There was an error while checking out "),
  });
  return { checkout, isCheckingout };
}
