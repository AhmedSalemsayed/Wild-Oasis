import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logOut as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
      mutationFn: logOutApi,
      onSuccess:() => {
        queryClient.removeQueries();
        navigate('/',{replace:true})
      }
    });
    return {logOut , isLoggingOut}
}

export default useLogOut
