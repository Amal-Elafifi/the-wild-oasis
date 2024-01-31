import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut as LogOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogOut(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logOut, isLoading} = useMutation({
        mutationFn: LogOutApi,
        onsuccess: () => {
            navigate("/login", {replace: true});
            queryClient.removeQueries();
        } 
    })

    return {logOut, isLoading}
}