import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkTaskCompletion as apiCheckTaskCompletion } from "./apiTasks";

export function useCheckCompeletion(){
    const queryClient = useQueryClient();
    const {mutate: checkTaskCompletion , isLoading: checkTaskCompletionLoading} = useMutation({
        mutationFn: ({task_id , isCompleted , date}) =>  apiCheckTaskCompletion({task_id , isCompleted , date}),
        onMutate: async ({ task_id, isCompleted }) => {
          await queryClient.cancelQueries({ queryKey: ['tasks'] });

          const previousTasks = queryClient.getQueryData(['tasks']);

          queryClient.setQueryData(['tasks'], (old) => {
            return old?.map(task =>
              task.id === task_id
                ? { ...task, done: isCompleted }
                : task
            );
          });

          return { previousTasks };
        },
        onError: (error, variables, context) => {
          if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
          }
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("تم التحقق من المهمة");
          queryClient.invalidateQueries({
            queryKey: ["tasks"]
          })
        }
    })
    return {
        checkTaskCompletion,
        checkTaskCompletionLoading
    }
}
