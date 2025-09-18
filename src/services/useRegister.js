import { useMutation } from "@tanstack/react-query";
import { Register } from "./apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister(setEmailSent){
    const navigate = useNavigate();
    
    const {mutate: register , isLoading} = useMutation({
        mutationFn: Register,
        onSuccess: (data) => {
            if (data?.user && !data.user.email_confirmed_at) {
                toast.success('تم إرسال رابط التأكيد إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.');
                if (setEmailSent) setEmailSent(true);
            } else {
                toast.success('تم التسجيل بنجاح');
                navigate('/');
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })    
    return {register , isLoading}
}
