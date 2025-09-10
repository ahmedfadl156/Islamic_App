import supabase from "../services/supabase"

export async function getStories(){
  const { data: stories, error } = await supabase
  .from('stories')
  .select('*')
  console.log(stories)
  return { stories, error }
}