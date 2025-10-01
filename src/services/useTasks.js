import { useQuery } from "@tanstack/react-query";
import { getUserTasks } from "./apiTasks";

export function useTasks(){
    const {data: tasks , isLoading , error} = useQuery({
        queryKey: ['tasks'],
        queryFn: getUserTasks
    })
    return {tasks , isLoading , error}
}
