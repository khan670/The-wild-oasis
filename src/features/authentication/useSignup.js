import { useMutation } from "@tanstack/react-query";
import { signUp as signUpPi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpPi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully Created! verify the new account from the user account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
