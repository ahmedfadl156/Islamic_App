import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProfile as addProfileApi } from "./apiPlannerProfiles";
import toast from "react-hot-toast";

export function useAddProfile(){
    const queryClient = useQueryClient();
    const {mutate: addProfile, isLoading, error} = useMutation({
        mutationFn: addProfileApi,
        onSuccess: (data) => {
            toast.success("تم إنشاء ملفك الشخصي بنجاح");
            // تحديث الـ cache مع البروفايل الجديد
            queryClient.setQueryData(["profile"], data);
        },
        onError: (err) => {
            toast.error(err?.message || "حدث خطأ أثناء إنشاء الملف الشخصي");
        }
    });
    
    return {addProfile, isLoading, error};
}
