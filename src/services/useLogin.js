import { useMutation } from "@tanstack/react-query";
import { Login } from "./apiAuth";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const navigate = useNavigate();
    const {mutate: login , isLoading} = useMutation({
        mutationFn: ({email , password}) => Login({email , password}),
        onSuccess: () => {
            toast.success('تم تسجيل الدخول بنجاح');
            navigate('/');
        },
        onError: (error) => {
            toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
    })
    return {login , isLoading}
}