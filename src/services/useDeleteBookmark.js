import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark as deleteBookmarkApi } from "./apiBookmarks";
import toast from "react-hot-toast";

export function useDeleteBookmark(){
    const queryClient = useQueryClient();
    
    const {mutate: deleteBookmark , isLoading: isDeleting} = useMutation({
        mutationFn: deleteBookmarkApi,
        
        onMutate: async (bookmarkId) => {
            await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
            
            const previousBookmarks = queryClient.getQueryData(["bookmarks"]);
            
            queryClient.setQueryData(["bookmarks"], (old) => 
                old ? old.filter(bookmark => bookmark.id !== bookmarkId) : []   
            );
            
            return { previousBookmarks };
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookmarks"],
            });
            toast.success('تم حذف المرجعية بنجاح');
        },
        
        onError: (error, bookmarkId, context) => {
            queryClient.setQueryData(["bookmarks"], context?.previousBookmarks);
            toast.error(error.message);
        }
    })   

    return {deleteBookmark , isDeleting}
}