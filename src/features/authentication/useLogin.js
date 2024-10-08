import { useMutation, useQueryClient } from "@tanstack/react-query";
import {login as LoginApi} from "../../services/apiAuth";
import toast from "react-hot-toast";
 import { useNavigate } from "react-router-dom";


function useLogin (){
    const queryClient = useQueryClient();
    const navigate= useNavigate();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => LoginApi({email, password}),
        onSuccess: (user) => {
            navigate("/dashboard", {replace: true});
            queryClient.setQueryData(["user"], user.user)
        },
        onError: (err) => {
            console.log("Error" , err);
            toast.error("wrong email or password ")
        }
    })
    return {login, isLoading}
}

export default useLogin;