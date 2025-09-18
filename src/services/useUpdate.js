import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "./apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdate(){
    const queryClient = useQueryClient();

    const {mutate: update , isLoading: isUpdating} = useMutation({
        mutationFn: ({name , email , phone}) => updateProfile({name , email , phone}),
        onSuccess: () => {
            toast.success('تم تحديث الملف الشخصي بنجاح 🎉');
            queryClient.invalidateQueries({queryKey: ['user']});
            window.location.reload();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return {update , isUpdating}
}