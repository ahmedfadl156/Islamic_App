import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "./apiAuth";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            queryClient.removeQueries();
            toast.success('تم تسجيل الخروج بنجاح');
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    
    return {logout, isLoading}
}
