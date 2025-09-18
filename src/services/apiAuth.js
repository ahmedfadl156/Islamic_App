import supabase from "./supabase"

export async function Login({email , password}){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if(error){
        throw new Error(error.message);
      }
      return data
}


export async function getUser(){
    const { data, error } = await supabase.auth.getUser()
    if(error){
        throw new Error(error.message);
    }
    return data
}


export async function Logout(){
    const {error} = await supabase.auth.signOut();
    if(error){
        throw new Error(error.message);
    }
}

export async function Register({name , email , password , phone}){
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName: name,
                Phone: phone
            }
        }
      })
      if(error){
        throw new Error(error.message);
      }
      return data
}