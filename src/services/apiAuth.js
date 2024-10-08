/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import supabase, { supabaseUrl } from "./supabase";


export async function signUp({fullName, email, password}){
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            }
        }
    });

    if(error){
        throw new Error(error.message);
    }
    return data;
}


export async function login({email, password}){
    let {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if(error) {
        throw new Error(error.message)
    }

    return data ;
}

export async function getCurrentUser(){
    const {data: session} = await supabase.auth.getSession();
    if(!session.session) return null ;

    const {data: {user}, error} = await supabase.auth.getUser();
    
    if(error) {
        throw new Error(error.message)
    }
    return user;
}

export async function LogOut(){
    const {error} = await supabase.auth.signOut();
    if(error){
        throw new Error(error.message)
    };
    return null;
}

export async function updateCurrentUser({fullName, avatar, password}){
    let userToUpdate;
    if (fullName) userToUpdate ={ data: {fullName}};
    if(password) userToUpdate = {password};

    // 1)update fullName or password
    const {data, error} = await supabase.auth.updateUser(userToUpdate);
    if(error){
        throw new Error(error.message)
    };

    if(!avatar) return data;

    // 2)upload avatar image
   let avatarName = `avatar-${data.user.id}-${Math.random()}`;

    const {error: storageError} = await supabase.storage.from('avatars').upload(avatarName, avatar);
    
    if(storageError){
        throw new Error(storageError.message)
    };

    // 3)update avatar image
    const{data: updatedUser, error: error2} = await supabase.auth.updateUser({
        data:{
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`
        }
    });

    if(error2){
        throw new Error(error2.message)
    };

    return updatedUser;

}