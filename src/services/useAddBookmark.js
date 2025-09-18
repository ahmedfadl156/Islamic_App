import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark as addBookmarkApi} from "./apiBookmarks";
import toast from "react-hot-toast";
import supabase from "./supabase";

export function useAddBookmark() {
    const queryClient = useQueryClient();
    
    const {mutate: addBookmark , isLoading: isAdding} = useMutation({
        mutationFn: ({surah_number, surah_name, ayah_number_in_surah , ayah_number, bookmark_name , ayah_text}) => 
            addBookmarkApi({surah_number, surah_name, ayah_number_in_surah , ayah_number, bookmark_name , ayah_text}),
        
        onMutate: async (newBookmark) => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    throw new Error("يجب تسجيل الدخول أولاً لإضافة المرجعيات");
                }
            } catch (error) {
                throw error;
            }

            await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
            const previousBookmarks = queryClient.getQueryData(["bookmarks"]);
            
            const optimisticBookmark = {
                id: Date.now(), 
                ...newBookmark,
                created_at: new Date().toISOString()
            };
            
            queryClient.setQueryData(["bookmarks"], (old) => 
                old ? [...old, optimisticBookmark] : [optimisticBookmark]
            );
            return { previousBookmarks };
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookmarks"],
            });
            toast.success('تم إضافة المرجعية بنجاح');
        },
        
        onError: (error, newBookmark, context) => {
            queryClient.setQueryData(["bookmarks"], context?.previousBookmarks);
            toast.error(error.message);
        }
    }) 

    return {addBookmark , isAdding}
}