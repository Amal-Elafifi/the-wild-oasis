import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser(){
    const queryClient = useQueryClient();
    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (user) => {
            toast.success("User account successfully updated");
            // queryClient.setQueryData("user", user) is used for updating data manually
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        },
        onError: (error)=> {
            toast.error(error.message)
        }
    })

    return {updateUser, isUpdating}
}

export default useUpdateUser;