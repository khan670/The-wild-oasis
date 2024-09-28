import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("cabins could not be loaded");
    throw new error("cabins could not be loaded");
  }
  

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("cabins could not be deleted");
    throw new error("cabins could not be deleted");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // const { data, error } = await supabase.from("cabins").insert([newCabin]);
  // https://kbjgtfrxqnrneoqhqtpz.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg?t=2024-09-15T09%3A35%3A21.489Z
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
  if (error) {
    console.error("cabins could not be created");
    throw new error("cabins could not be created");
  }
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error("the cabin image could not uploaded successfully");
    throw new error("the cabin image could not uploaded successfully");
  }
  return data;
}
