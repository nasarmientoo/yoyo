import { serverSupabase } from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabase = serverSupabase(config);

  const { data, error } = await supabase
    .from("Events")
    .select("id, name, photos, promotional_text")
    .eq("highlighted", true)
    .order("name", { ascending: true })
    .limit(4);

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
