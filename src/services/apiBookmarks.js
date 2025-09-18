import supabase from "./supabase"

export async function addBookmark({surah_number, surah_name, ayah_number_in_surah , ayah_number, bookmark_name , ayah_text}){
    const {data: {user}} = await supabase.auth.getUser();
    if(!user){
        throw new Error("يجب تسجيل الدخول أولاً لإضافة المرجعيات");
    }
    const {data, error} = await supabase.from('bookmarks').insert([
        {
            surah_number,
            surah_name,
            ayah_number_in_surah,
            ayah_number,
            bookmark_name,
            ayah_text,
            user_id: user.id
        }
    ])
    if(error){
        throw new Error(error.message);
    }
    return data
}

export async function getUserBookmarks(){
    const {data: {user}} = await supabase.auth.getUser();
    if(!user){
        throw new Error("يجب تسجيل الدخول أولاً لعرض المرجعيات");
    }
    const {data, error} = await supabase.from('bookmarks').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if(error){
        throw new Error(error.message);
    }
    return data
}


export async function deleteBookmark(bookmarkId){
    const {data, error} = await supabase.from('bookmarks').delete().eq('id', bookmarkId)
    if(error){
        throw new Error("حدث خطأ أثناء حذف المرجعية");
    }
    return data
}
