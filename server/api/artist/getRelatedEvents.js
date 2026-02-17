import { serverSupabase } from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = serverSupabase(config);

  const { id } = getQuery(event);

  const { data, error } = await supabase
    .from("ArtistsEvent")
    .select(
      `
      Events (
        id,
        name,
        description,
        photos,
        highlighted
      )
    `
    )
    .eq("artist_id", id);

  if (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }

  return {
    success: true,
    data: data ?? [],
  };
});
