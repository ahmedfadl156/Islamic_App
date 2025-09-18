import { useMutation } from "@tanstack/react-query";
import { Register } from "./apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister(){
    const navigate = useNavigate();
    
    const {mutate: register , isLoading} = useMutation({
        mutationFn: Register,
        onSuccess: () => {
            toast.success('تم التسجيل بنجاح');
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })    
    return {register , isLoading}
}
