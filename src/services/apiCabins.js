import { id } from "date-fns/locale";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function createCabin({ data: cabinData, isEditing = false }) {
  const isImageAdded = typeof cabinData?.image !== "string";

  const newCabin = isImageAdded
    ? { ...cabinData, image: cabinData.image[0] }
    : cabinData;

  if (!newCabin.discount) newCabin.discount = 0;

  //https://awmagyuhmvntfhqtiwgu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = isImageAdded
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : cabinData.image;

  let query;

  if (!isEditing) {
    query = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }]);
  } else {
    const updateCabin = isImageAdded
      ? { ...newCabin, image: imagePath }
      : newCabin;

    query = await supabase
      .from("cabins")
      .update(updateCabin)
      .eq("id", newCabin.id)
      .select();
  }

  const { data, error } = query;

  if (isImageAdded) {
    const { error: storageError } = await supabase.storage
      .from(`cabin-images`)
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Couldn't upload the image");
    }
  } else return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Couldn't delete the cabin");
}
