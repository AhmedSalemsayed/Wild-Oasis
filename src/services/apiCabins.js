import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, editId) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1- create/Edit a cabin

  let query = supabase.from("cabins");

  //A) create a cabin
  if (!editId) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //B)update cabin
  if (editId) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
  }

  //2.upload image
  if(hasImagePath) return data;
  
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      "Cabin's image couldn't be uploaded & Cabin could not be Created"
    );
  }
  console.log(data);
  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) {
    console.error(error);
    throw new Error("sorry , The cabin could not be deleted");
  }
  return data;
}
