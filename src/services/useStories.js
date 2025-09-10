import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStories } from "./getStories";
import { getStory } from "./getStory";

export function useStories() {
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading: isLoadingStories,
    error,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
    onError: (error) => {
      console.error("Error fetching stories:", error);
    },
  });
  
  return { 
    stories: data?.stories || [], 
    isLoadingStories, 
    error 
  };
}


export function useStory(id) {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: isLoadingStory,
    error,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
    onError: (error) => {
      console.error("Error fetching story:", error);
    },
  });
  
  return { 
    story: data?.story || null, 
    isLoadingStory, 
    error 
  };
}
