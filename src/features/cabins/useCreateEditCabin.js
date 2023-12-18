import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useCreateEditCabin(isEditing = false) {
  const queryClient = useQueryClient();

  const { mutate: createEditCabin, isLoading: isUpdatingCreating } =
    useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
        toast.success(
          isEditing
            ? "Cabin updated successfully"
            : "Cabin created successfully"
        );
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createEditCabin, isUpdatingCreating };
}
