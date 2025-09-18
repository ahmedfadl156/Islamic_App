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
            },
            emailRedirectTo: `${window.location.origin}/confirm`
        }
      })
      if(error){
        throw new Error(error.message);
      }
      return data
}

export async function confirmEmail() {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
}


export async function updateProfile({name , email , phone}){
    const {data , error} = await supabase.auth.updateUser({
        email: email,
        data: {
            displayName: name,
            Phone: phone
        }
    })
    if(error){
        throw new Error(error.message);
    }
    return data;
}