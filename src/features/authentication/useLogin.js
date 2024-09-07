import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Provided username or password are incorrect");
    },
  });
  return { login, isLoggingIn };
}

export default useLogin;
