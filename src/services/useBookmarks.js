import { useQuery } from "@tanstack/react-query";
import { getUserBookmarks } from "./apiBookmarks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useBookmarks() {
    const {data: bookmarks = [], isLoading, error} = useQuery({
        queryKey: ["bookmarks"],
        queryFn: getUserBookmarks,
        onError: (error) => {
            console.error("Error fetching bookmarks:", error);
            toast.error("حدث خطأ أثناء جلب المراجيع")
        },
        retry: 1, 
        refetchOnWindowFocus: false,
        staleTime: 0, 
        cacheTime: 5 * 60 * 1000, 
    })  
    return {bookmarks: bookmarks || [], isLoading, error} 
}

