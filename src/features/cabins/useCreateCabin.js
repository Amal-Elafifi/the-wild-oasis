import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(){
    const queryClient = useQueryClient();

    const {isLoading: isCreating, mutate: createCabin} = useMutation({
      mutationFn: CreateEditCabin,
      onSuccess: () => {
        toast.success("new cabin successflly created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"]
        });
      },
      onError: (err)=> {
        toast.error(err.message);
      }
    });

    return {isCreating, createCabin};
}