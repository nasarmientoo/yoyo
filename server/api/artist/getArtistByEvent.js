import { serverSupabase } from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = serverSupabase(config);
  const query = getQuery(event);
  const eventId = query.id;

  const { data, error } = await supabase
    .from("ArtistsEvent")
    .select(
      `
      timetable,
      Artists (
        id,
        name,
        surname,
        photos
      )
    `
    )
    .eq("event_id", eventId);

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
    error: null,
  };
});
