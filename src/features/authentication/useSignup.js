import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningup } = useMutation({
    mutationFn: ({ email, password, firstName }) =>
      signupApi({ email, password, firstName }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "You have got a verification email, verify it from your email to use your account"
      );
    },
    onError: (error) =>
      toast.error(error.message || "There was an error while signing up user"),
  });

  return { signup, isSigningup };
}
