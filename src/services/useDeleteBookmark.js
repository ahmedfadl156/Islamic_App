import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark as deleteBookmarkApi } from "./apiBookmarks";
import toast from "react-hot-toast";
import supabase from "./supabase";

export function useDeleteBookmark(){
    const queryClient = useQueryClient();
    
    const {mutate: deleteBookmark , isLoading: isDeleting} = useMutation({
        mutationFn: deleteBookmarkApi,
        
        onMutate: async (bookmarkId) => {
            // Check if user is logged in before optimistic update
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    throw new Error("يجب تسجيل الدخول أولاً لحذف المرجعيات");
                }
            } catch (error) {
                // Don't do optimistic update if user not logged in
                throw error;
            }

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