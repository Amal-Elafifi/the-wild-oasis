import supabase, { supabaseUrl } from "./supabase";

async function getCabins (){
    let { data, error } = await supabase
    .from('cabins')
    .select('*');
    if(error){
        console.error(error);
        throw new Error("cabins can't be loaded");
    }
    return data;

}

export async function CreateEditCabin(newCabin, id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // create/Edit Cabin
    let query = supabase.from('cabins');

    // A) create cabin
    if(!id) {
        query = query.insert([{...newCabin, image: imagePath}])
    }
    // B) Edit cabin
    if(id){
        query = query.update({...newCabin, image: imagePath})
        .eq("id", id);
        
    }
    
    const { data, error } = await query.select().single();




    if(error){
        console.error(error);
        throw new Error("cabin can't be created");
    }

    // upload image
    if(hasImagePath) return data;
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);
    
    // delete cabin if there is any error
    if(error){
         await supabase
        .from('cabins')
        .delete()
        .eq("id", data.id);
    
        if(storageError){
            console.error(storageError);
            throw new Error("cabin couldn't be uploaded and cabin is not created");
        }
    }

    return data;

    

}

export async function deleteCabin(id){
    const {data, error } = await supabase
    .from('cabins')
    .delete()
    .eq("id", id);

    if(error){
        console.error(error);
        throw new Error("cabin can't be deleted");
    }
    return data;
}

export default getCabins;
