import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("You have been logged in succesfully");
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user.data.user);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Email or password is incorrect");
    },
  });

  return { login, isLoading };
}
