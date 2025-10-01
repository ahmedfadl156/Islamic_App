import { useQuery } from "@tanstack/react-query";
import { getPlannerProfile } from "./apiPlannerProfiles";
import { useAddProfile } from "./useAddProfile";
import { useEffect } from "react";

export function useProfile(){
    const {data: profile, isLoading, error} = useQuery({
        queryKey: ["profile"],
        queryFn: getPlannerProfile,
        enabled: true, 
        retry: 1,
        staleTime: 5 * 60 * 1000, 
    });
    
    const {addProfile, isLoading: isAddingProfile} = useAddProfile();
    
    // إذا لم يكن هناك بروفايل وانتهى التحميل، أنشئ بروفايل جديد
    useEffect(() => {
        if (!isLoading && !profile && !error && !isAddingProfile) {
            addProfile();
        }
    }, [isLoading, profile, error, addProfile, isAddingProfile]);
    
    return {
        profile, 
        isLoading: isLoading || isAddingProfile, 
        error
    }
}