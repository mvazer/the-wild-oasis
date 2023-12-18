import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useBookingDelete() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (data) => {
      toast.success("Booking has been deleted");
    },
    onError: () => toast.error("Booking couldn't be deleted"),
  });
  return { deleteBooking, isDeleting };
}
