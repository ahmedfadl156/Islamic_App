import { useMutation } from "@tanstack/react-query";
import { addTask as addTaskApi } from "./apiTasks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useAddTask(){
    const queryClient = useQueryClient();
    const {mutate: addTask , isLoading} = useMutation({
        mutationFn: ({title , reward_points , description , category}) => addTaskApi({title , reward_points , description , category}),
        onSuccess: () => {
         toast.success("تم إضافة المهمة بنجاح");  
         queryClient.invalidateQueries({queryKey: ['tasks']}); 
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة المهمة");
        }
    })
    return {addTask , isLoading}    
}
