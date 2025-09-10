import supabase from "./supabase";

export async function getStory(id){
  const { data: story, error } = await supabase
  .from('stories')
  .select('*')
  .eq('id', id).single()

  console.log(story)
  return { story, error }
}