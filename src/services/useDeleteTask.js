import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTask as deleteTaskApi } from "./apiTasks";

export function useDeleteTask(){
    const queryClient = useQueryClient();
    const {mutate: deleteTask , isLoading: deleteTaskLoading} = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => {
            toast.success("تم حذف المهمة");
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })   
    return {deleteTask , deleteTaskLoading}; 
}
