import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: () => toast.error("an error occured while creating the Account "),
  });

  return {signUp , isSigningUp};
}

export default useSignUp;
