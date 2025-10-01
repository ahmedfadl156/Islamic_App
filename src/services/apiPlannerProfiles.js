import supabase from "./supabase";

export async function getPlannerProfile(){
    const {data: user} = await supabase.auth.getUser();
    if(!user || !user.user){
        throw new Error("يجب عليك تسجيل الدخول لرؤية المهام الخاصة بك");
    }
    const {data , error} = await supabase.from('profiles').select('*').eq("id" , user.user.id)
    if(error){
        throw new Error(error.message);
    }
    return data?.[0] || null 
}

export async function addProfile(){
    const {data: user} = await supabase.auth.getUser();
    if(!user || !user.user){
        throw new Error("يجب عليك تسجيل الدخول لرؤية المهام الخاصة بك");
    }
    const {data , error} = await supabase.from('profiles').insert([
        {
            id: user.user.id,
            streak: 0,
            level: 1,
            points: 0
        }
    ]).select().single();
    if(error){
        throw new Error(error.message);
    }
    return data || null 
}

export async function updateProfile({streak , level , points, last_activity_date}){
    const {data: user} = await supabase.auth.getUser();
    if(!user || !user.user){
        throw new Error("يجب عليك تسجيل الدخول لرؤية المهام الخاصة بك");
    }
    const {data , error} = await supabase.from('profiles').update({streak , level , points, last_activity_date}).eq("id" , user.user.id)
    if(error){
        throw new Error(error.message);
    }
    return data?.[0] || null 
}