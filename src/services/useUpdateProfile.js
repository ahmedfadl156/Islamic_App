import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "./apiPlannerProfiles";
import toast from "react-hot-toast";

export function useUpdateProfile(){
    const queryClient = useQueryClient();
    const {mutate: updateProfile , isLoading , error} = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: () => {
            toast.success("تم تحديث مستواك بنجاح")
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })
    return {updateProfile , isLoading , error}
}