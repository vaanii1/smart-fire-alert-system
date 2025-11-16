import supabase from "./supabase";

export async function getHouses() {
  //create query from the supabase client
  const { data: houses, error } = await supabase.from("houses").select("*");
  if (error) {
    console.error(error);
    throw new Error("Houses could not be loaded");
  }
  return houses;
}
